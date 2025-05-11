import React from 'react';
import { Heart, Gamepad2, Music, Book, Trophy } from 'lucide-react';

export const Interests = () => {
  const interests = [
    {
      title: 'Culture Japonaise',
      icon: Book,
      description: 'Passionné d\'animes et de mangas.',
      top3: ['Naruto', 'Fullmetal Alchemist: Brotherhood', 'Death Note'],
      others: ['Dragon Ball Z', 'Les Chevaliers du Zodiaque', 'Yu-Gi-Oh!', 'Chainsaw Man', 'Jujutsu Kaisen']
    },
    {
      title: 'Musique',
      icon: Music,
      description: 'Éclectique dans mes goûts musicaux.',
      top3: ['Orelsan', 'Linkin Park', 'Flow'],
      others: [
        'Rap : Future, Freeze Corleone, Kendrick Lamar',
        'Rock : Imagine Dragons',
        'J-pop : Ado, Creepy Nuts, SiM, Survive Said The Prophet, MAN WITH A MISSION'
      ]
    },
    {
      title: 'Jeux Vidéo',
      icon: Gamepad2,
      description: 'Amateur de jeux de stratégie et FPS.',
      top3: ['Civilization', 'Age of Empires', 'Football Manager'],
      others: ['Doom', 'League of Legends', 'Crusader Kings III', 'Mobile Legends']
    },
    {
      title: 'Mythologie',
      icon: Book,
      description: 'Passionné par les contes mythologiques.',
      top3: ['Mythologie Grecque', 'Mythologie Viking', 'Mythologie Turque'],
      others: ['Mythologie Romaine', 'Mythologie Aztèque', 'Mythologie Inca', 'Mythologie Maya', 'Mythologie Japonaise']
    }
  ];

  return (
    <section id="interests" className="py-20 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 flex items-center justify-center">
          <Heart className="w-8 h-8 mr-3 text-red-600 icon-spin" />
          Centres d'intérêt
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
                    Top 3
                  </h4>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1">
                    {interest.top3.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Autres :</h4>
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