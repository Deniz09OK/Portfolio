import { Monitor, FileCode, Database, Network, Server, Wrench, Cpu, Library, GitBranch, ClipboardList, Users, Brain, TestTube, MessageSquare } from 'lucide-react';

export const skillsData = {
  'Systèmes d\'exploitation': {
    icon: Monitor,
    skills: [
      { name: 'Linux', wikiLink: 'https://fr.wikipedia.org/wiki/Linux', icon: Monitor },
      { name: 'Windows', wikiLink: 'https://fr.wikipedia.org/wiki/Microsoft_Windows', icon: Monitor },
      { name: 'OpenBSD', wikiLink: 'https://fr.wikipedia.org/wiki/OpenBSD', icon: Monitor },
      { name: 'FreeBSD', wikiLink: 'https://fr.wikipedia.org/wiki/FreeBSD', icon: Monitor },
      { name: 'Mageia', wikiLink: 'https://fr.wikipedia.org/wiki/Mageia', icon: Monitor },
      { name: 'Debian', wikiLink: 'https://fr.wikipedia.org/wiki/Debian', icon: Monitor }
    ]
  },
  'Langages de programmation': {
    icon: FileCode,
    skills: [
      { name: 'C/C++', wikiLink: 'https://fr.wikipedia.org/wiki/C%2B%2B', icon: FileCode },
      { name: 'HTML', wikiLink: 'https://fr.wikipedia.org/wiki/Hypertext_Markup_Language', icon: FileCode },
      { name: 'CSS', wikiLink: 'https://fr.wikipedia.org/wiki/Feuilles_de_style_en_cascade', icon: FileCode },
      { name: 'PHP', wikiLink: 'https://fr.wikipedia.org/wiki/PHP', icon: FileCode },
      { name: 'Python', wikiLink: 'https://fr.wikipedia.org/wiki/Python_(langage)', icon: FileCode },
      { name: 'Java', wikiLink: 'https://fr.wikipedia.org/wiki/Java_(langage)', icon: FileCode },
      { name: 'JavaScript', wikiLink: 'https://fr.wikipedia.org/wiki/JavaScript', icon: FileCode },
      { name: 'TypeScript', wikiLink: 'https://fr.wikipedia.org/wiki/TypeScript', icon: FileCode },
      { name: 'Groovy', wikiLink: 'https://fr.wikipedia.org/wiki/Groovy_(langage)', icon: FileCode }
    ]
  },
  'Frameworks & Outils': {
    icon: Library,
    skills: [
      { name: 'Node.js', wikiLink: 'https://fr.wikipedia.org/wiki/Node.js', icon: FileCode },
      { name: 'Express.js', wikiLink: 'https://fr.wikipedia.org/wiki/Express.js', icon: FileCode },
      { name: 'React.js', wikiLink: 'https://fr.wikipedia.org/wiki/React', icon: FileCode },
      { name: 'Bootstrap', wikiLink: 'https://fr.wikipedia.org/wiki/Bootstrap_(framework)', icon: FileCode },
      { name: 'Tailwind CSS', wikiLink: 'https://fr.wikipedia.org/wiki/Tailwind_CSS', icon: FileCode },
      { name: 'Symfony', wikiLink: 'https://fr.wikipedia.org/wiki/Symfony', icon: FileCode },
      { name: 'Jenkins', wikiLink: 'https://fr.wikipedia.org/wiki/Jenkins_(logiciel)', icon: Server },
      { name: 'Cisco Packet Tracer', wikiLink: 'https://fr.wikipedia.org/wiki/Cisco_Packet_Tracer', icon: Network },
      { name: 'PuTTY', wikiLink: 'https://fr.wikipedia.org/wiki/PuTTY', icon: Monitor },
      { name: 'VirtualBox', wikiLink: 'https://fr.wikipedia.org/wiki/Oracle_VM_VirtualBox', icon: Monitor },
      { name: 'Arduino', wikiLink: 'https://fr.wikipedia.org/wiki/Arduino', icon: Cpu },
      { name: 'Processing', wikiLink: 'https://fr.wikipedia.org/wiki/Processing', icon: FileCode },
      { name: 'Visual Studio', wikiLink: 'https://fr.wikipedia.org/wiki/Microsoft_Visual_Studio', icon: FileCode },
      { name: 'Visual Studio Code', wikiLink: 'https://fr.wikipedia.org/wiki/Visual_Studio_Code', icon: FileCode },
      { name: 'IntelliJ IDEA', wikiLink: 'https://fr.wikipedia.org/wiki/IntelliJ_IDEA', icon: FileCode }
    ]
  },
  'Bases de données': {
    icon: Database,
    skills: [
      { name: 'MongoDB', wikiLink: 'https://fr.wikipedia.org/wiki/MongoDB', icon: Database },
      { name: 'MySQL', wikiLink: 'https://fr.wikipedia.org/wiki/MySQL', icon: Database },
      { name: 'SQLite', wikiLink: 'https://fr.wikipedia.org/wiki/SQLite', icon: Database }
    ]
  },
  'Réseaux': {
    icon: Network,
    skills: [
      { name: 'Configuration routeurs', wikiLink: 'https://fr.wikipedia.org/wiki/Routeur', icon: Server },
      { name: 'Configuration switches', wikiLink: 'https://fr.wikipedia.org/wiki/Commutateur_réseau', icon: Server }
    ]
  },
  'Méthodologies & Gestion': {
    icon: Brain,
    skills: [
      { name: 'Gestion de projet informatique', wikiLink: 'https://fr.wikipedia.org/wiki/Gestion_de_projet', icon: ClipboardList },
      { name: 'Développement logiciel', wikiLink: 'https://fr.wikipedia.org/wiki/Développement_de_logiciel', icon: FileCode },
      { name: 'Programmation orientée objet', wikiLink: 'https://fr.wikipedia.org/wiki/Programmation_orientée_objet', icon: FileCode },
      { name: 'Git/GitHub', wikiLink: 'https://fr.wikipedia.org/wiki/Git', icon: GitBranch },
      { name: 'Documentation technique', wikiLink: 'https://fr.wikipedia.org/wiki/Documentation_technique', icon: ClipboardList },
      { name: 'Travail en équipe', wikiLink: 'https://fr.wikipedia.org/wiki/Travail_d%27équipe', icon: Users },
      { name: 'Méthodologie Agile/Scrum', wikiLink: 'https://fr.wikipedia.org/wiki/Scrum_(développement)', icon: Brain },
      { name: 'Analyse des besoins', wikiLink: 'https://fr.wikipedia.org/wiki/Analyse_des_besoins', icon: Brain },
      { name: 'Tests et validation', wikiLink: 'https://fr.wikipedia.org/wiki/Test_de_logiciel', icon: TestTube },
      { name: 'Communication technique', wikiLink: 'https://fr.wikipedia.org/wiki/Communication_technique', icon: MessageSquare }
    ]
  },
  'Dépannage': {
    icon: Wrench,
    skills: [
      { name: 'Assistance technique', wikiLink: 'https://fr.wikipedia.org/wiki/Support_technique', icon: Wrench }
    ]
  }
};