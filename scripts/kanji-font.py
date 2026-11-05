"""Génère public/fonts/noto-serif-jp-kanji.woff2 : Noto Serif JP réduit aux caractères japonais du site.

    pip install -r scripts/requirements-fonts.txt
    python3 scripts/kanji-font.py

Le woff2 est commité : ce script ne tourne pas au build, il sert à le régénérer après un changement de kanji
dans data/portfolio.ts. Il met aussi à jour la unicode-range de la règle @font-face dans assets/css/fonts.css.

Sources : fonts-src/noto-serif-jp/, les sous-ensembles Google Fonts de Noto Serif JP (police variable, SIL OFL 1.1,
non publiés). Chaque source qui contient un caractère utilisé est réduite à ces caractères (fontTools.subset), puis
les glyphes sont réunis dans un seul fichier avec leurs variations (gvar) : la police reste variable, le navigateur
calcule la graisse 900 comme avant et le rendu est identique au pixel près. Un instance statique à 900 serait plus
légère, mais arrondit des coordonnées et change l'anticrénelage de quelques pixels.
L'espace est inclus : il fait de Noto Serif JP la police principale des blocs kanji, ce qui garde leurs métriques
de ligne. La table name (copyright, licence) est conservée.
"""
import copy
import re
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'fonts-src' / 'noto-serif-jp'
DATA = ROOT / 'data' / 'portfolio.ts'
OUT = ROOT / 'public' / 'fonts' / 'noto-serif-jp-kanji.woff2'
CSS = ROOT / 'assets' / 'css' / 'fonts.css'

# Écritures japonaises et CJK : ponctuation, kana, idéogrammes, formes pleine chasse.
JP = re.compile('[　-ヿ㐀-䶿一-鿿豈-﫿＀-￯]')
SPACE = 0x20
# Tables d'avance verticale et de variations d'avance : non fusionnées. Sans HVAR, le navigateur prend les variations
# d'avance dans gvar (points fantômes) ; le texte du site est horizontal.
DROP = ('HVAR', 'VVAR', 'vhea', 'vmtx')


def wanted():
    chars = sorted(set(JP.findall(DATA.read_text(encoding='utf-8'))))
    if not chars:
        sys.exit('aucun caractère japonais trouvé dans data/portfolio.ts')
    return [SPACE] + [ord(c) for c in chars]


def reduced(path, codepoints):
    font = TTFont(path)
    opts = subset.Options()
    opts.layout_features = ['*']
    opts.name_IDs = ['*']
    opts.name_languages = ['*']
    opts.notdef_outline = True
    opts.drop_tables += list(DROP)
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=codepoints)
    sub.subset(font)
    return font


def add_glyphs(base, other, tag):
    """Copie dans base les glyphes de other (contours, avance, variations) et leurs entrées cmap."""
    mapped = {name for name in other.getBestCmap().values()}
    rename = {g: (g if g in mapped else f'{g}.{tag}') for g in other.getGlyphOrder()}
    order = list(base.getGlyphOrder())
    known = set(order)
    glyf, hmtx, gvar = base['glyf'], base['hmtx'], base['gvar']
    for g in other.getGlyphOrder():
        new = rename[g]
        if g == '.notdef' or new in known:
            continue
        glyph = copy.deepcopy(other['glyf'][g])
        if glyph.isComposite():
            for comp in glyph.components:
                comp.glyphName = rename[comp.glyphName]
        glyf.glyphs[new] = glyph
        hmtx.metrics[new] = other['hmtx'].metrics[g]
        gvar.variations[new] = copy.deepcopy(other['gvar'].variations.get(g, []))
        order.append(new)
        known.add(new)
    base.setGlyphOrder(order)
    glyf.glyphOrder = order
    for table in base['cmap'].tables:
        if table.isUnicode():
            for cp, g in other.getBestCmap().items():
                table.cmap[cp] = rename[g]


def unicode_range(codepoints):
    return ', '.join(f'U+{c:04x}' for c in sorted(codepoints))


def main():
    need = wanted()
    left = set(need)
    parts = []
    for path in sorted(SRC.glob('*.woff2')):
        cmap = TTFont(path, lazy=True).getBestCmap()
        here = sorted(left & set(cmap))
        if here:
            parts.append((path.stem, reduced(path, here)))
            left -= set(here)
    if left:
        sys.exit('absents des sources : ' + ''.join(chr(c) for c in sorted(left)))

    _, base = parts[0]
    for tag, other in parts[1:]:
        add_glyphs(base, other, tag)
    base.flavor = 'woff2'
    base.recalcTimestamp = False
    base.save(OUT)

    check = TTFont(OUT)
    missing = [c for c in need if c not in check.getBestCmap()]
    if missing:
        sys.exit('absents du woff2 : ' + ''.join(chr(c) for c in missing))

    css = CSS.read_text(encoding='utf-8')
    block = re.compile(r"(font-family: 'Noto Serif JP';[^}]*?unicode-range: )[^;]*(;)", re.S)
    css, n = block.subn(lambda m: m.group(1) + unicode_range(need) + m.group(2), css)
    if n != 1:
        sys.exit(f'{CSS.name} : une seule règle @font-face Noto Serif JP attendue, {n} trouvée(s)')
    CSS.write_text(css, encoding='utf-8')

    print(f'[kanji] {OUT.relative_to(ROOT)} : {len(need) - 1} kanji + espace, {OUT.stat().st_size} octets')


if __name__ == '__main__':
    main()
