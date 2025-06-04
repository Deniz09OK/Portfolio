import { Heart, Gamepad2, Music, Book, Trophy } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

export const Interests = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const interests = [
    {
      title: language === 'fr' ? 'Culture Japonaise' : 'Japanese Culture',
      icon: Book,
      description: language === 'fr' ? 'Passionné d\'animes et de mangas.' : 'Passionate about anime and manga.',
      top3: ['Naruto', 'Fullmetal Alchemist: Brotherhood', 'Death Note'],
      others: ['Dragon Ball Z', 'Les Chevaliers du Zodiaque', 'Yu-Gi-Oh!', 'Chainsaw Man', 'Jujutsu Kaisen']
    },
    {
      title: language === 'fr' ? 'Musique' : 'Music',
      icon: Music,
      description: language === 'fr' ? 'Éclectique dans mes goûts musicaux.' : 'Eclectic in musical tastes.',
      top3: ['Orelsan', 'Linkin Park', 'Flow'],
      others: [
        language === 'fr' ? 'Rap : Future, Freeze Corleone, Kendrick Lamar' : 'Rap: Future, Freeze Corleone, Kendrick Lamar',
        language === 'fr' ? 'Rock : Imagine Dragons' : 'Rock: Imagine Dragons',
        language === 'fr' ? 'J-pop : Ado, Creepy Nuts, SiM, Survive Said The Prophet, MAN WITH A MISSION' : 'J-pop: Ado, Creepy Nuts, SiM, Survive Said The Prophet, MAN WITH A MISSION'
      ]
    },
    {
      title: language === 'fr' ? 'Jeux Vidéo' : 'Video Games',
      icon: Gamepad2,
      description: language === 'fr' ? 'Amateur de jeux de stratégie et FPS.' : 'Strategy and FPS games enthusiast.',
      top3: ['Civilization', 'Age of Empires', 'Football Manager'],
      others: ['Doom', 'League of Legends', 'Crusader Kings III', 'Mobile Legends']
    },
    {
      title: language === 'fr' ? 'Mythologie' : 'Mythology',
      icon: Book,
      description: language === 'fr' ? 'Passionné par les contes mythologiques.' : 'Passionate about mythological tales.',
      top3: [
        language === 'fr' ? 'Mythologie Grecque' : 'Greek Mythology',
        language === 'fr' ? 'Mythologie Viking' : 'Viking Mythology',
        language === 'fr' ? 'Mythologie Turque' : 'Turkish Mythology'
      ],
      others: [
        language === 'fr' ? 'Mythologie Romaine' : 'Roman Mythology',
        language === 'fr' ? 'Mythologie Aztèque' : 'Aztec Mythology',
        language === 'fr' ? 'Mythologie Inca' : 'Inca Mythology',
        language === 'fr' ? 'Mythologie Maya' : 'Maya Mythology',
        language === 'fr' ? 'Mythologie Japonaise' : 'Japanese Mythology'
      ]
    }
  ];

  return (
    <section id="interests" className="py-20 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 flex items-center justify-center">
          <Heart className="w-8 h-8 mr-3 text-red-600 icon-spin" />
          {t.interests}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {interests.map((interest, index) => (
            <div 
              key={interest.title}
              className="interest-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <interest.icon className="w-5 h-5 mr-2 text-red-600" />
                {interest.title}
              </h3>
              <p className="text-gray-600 mb-4">{interest.description}</p>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-600 flex items-center mb-2">
                    <Trophy className="w-4 h-4 mr-2" />
                    {t.top3}
                  </h4>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1">
                    {interest.top3.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">{t.others} :</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {interest.others.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};