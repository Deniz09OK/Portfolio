"""Nettoie les métadonnées des CV publiés : public/cv-deniz-ok-fr.pdf et public/cv-deniz-ok-en.pdf.

    pip install -r scripts/requirements-cv.txt
    python3 scripts/clean-cv.py

À relancer après chaque nouvel export du CV. Seules les métadonnées changent : dictionnaire Info réduit au titre
et à l'auteur, flux XMP réécrit (titre, auteur, format, langue, identifiant PDF/UA), langue du document. Les
logiciels de conception, les dates, les mots-clés et les identifiants internes d'export disparaissent. Le contenu
des pages, le balisage d'accessibilité, les liens et le profil de couleur ne sont pas touchés. pikepdf (qpdf)
enregistre sans ajouter de champ Producer.
"""
import sys
from pathlib import Path
from xml.sax.saxutils import escape

import pikepdf

ROOT = Path(__file__).resolve().parent.parent
AUTHOR = 'Deniz OK'
CVS = [
    ('cv-deniz-ok-fr.pdf', 'Deniz OK — CV', 'fr'),
    ('cv-deniz-ok-en.pdf', 'Deniz OK — CV (English)', 'en'),
]


def xmp(title, lang):
    t, a = escape(title), escape(AUTHOR)
    return f'''<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:pdfuaid="http://www.aiim.org/pdfua/ns/id/">
      <dc:format>application/pdf</dc:format>
      <dc:title>
        <rdf:Alt>
          <rdf:li xml:lang="x-default">{t}</rdf:li>
          <rdf:li xml:lang="{lang}">{t}</rdf:li>
        </rdf:Alt>
      </dc:title>
      <dc:creator>
        <rdf:Seq>
          <rdf:li>{a}</rdf:li>
        </rdf:Seq>
      </dc:creator>
      <dc:language>
        <rdf:Bag>
          <rdf:li>{lang}</rdf:li>
        </rdf:Bag>
      </dc:language>
      <pdfuaid:part>1</pdfuaid:part>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>'''.encode('utf-8')


def clean(path, title, lang):
    with pikepdf.open(path, allow_overwriting_input=True) as pdf:
        info = pikepdf.Dictionary(Title=pikepdf.String(title), Author=pikepdf.String(AUTHOR))
        pdf.trailer.Info = pdf.make_indirect(info)
        metadata = pikepdf.Stream(pdf, xmp(title, lang))
        metadata.Type = pikepdf.Name.Metadata
        metadata.Subtype = pikepdf.Name.XML
        pdf.Root.Metadata = pdf.make_indirect(metadata)
        pdf.Root.Lang = pikepdf.String(lang)
        pdf.save(path, deterministic_id=True, compress_streams=False,
                 stream_decode_level=pikepdf.StreamDecodeLevel.none,
                 object_stream_mode=pikepdf.ObjectStreamMode.preserve)


def main():
    for name, title, lang in CVS:
        path = ROOT / 'public' / name
        if not path.exists():
            sys.exit(f'{name} absent de public/')
        clean(path, title, lang)
        print(f'[cv] public/{name} : « {title} », {AUTHOR}, {lang}')


if __name__ == '__main__':
    main()
