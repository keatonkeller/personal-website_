import { Activity, Wifi, Film, Video, DollarSign, TrendingUp, Lock } from 'lucide-react';

export const workExperience = [
  {
    id: 'ugc',
    company: 'UGC.com',
    role: 'Founder',
    type: 'Startup',
    period: '2025-',
    url: 'https://ugc.com',
    description: 'UGC.com is redefining multi-platform monetization and creator finance with daily liquidity powered by next-gen payment rails. By leveraging stablecoins and future-proof financial infrastructure, we enable creators, artists, agencies, and enterprises to access royalties instantly and take control of their financial future.'
  },
  {
    id: 'gas-media',
    company: 'Gas Media Group',
    role: 'Founder',
    type: 'Media',
    period: '2018-2024',
    url: '#',
    isExited: true,
    description: 'Founded and self-funded Gas Media Group, the world\'s leading short-form video licensing company focused on aggregation and syndication. Scaled the business to $22M in ARR—cash-flow positive and profitable—with 1,900+ clients and 3B+ monthly views, powering monetization for both breakout and established creators. Pioneered revenue models on platforms that lacked native monetization at the time (e.g., TikTok).'
  },
  {
    id: 'techsmartt',
    company: 'TechSmartt',
    role: 'Content Creator',
    type: '',
    period: '2010-',
    url: 'https://youtube.com/tech',
    description: 'Created one of YouTube\'s first breakout tech channels, building an audience of 4M+ with reviews and cultural moments like the Drop Test and Fidget Spinner. Defined tech-entertainment and inspired today\'s digital creators.'
  }
];

export const statusItems = [
  { icon: Activity, text: "Founder, Creator, Builder, Investor", color: "text-gray-400" },
  { icon: Wifi, text: "BUILDING DIGITAL EXPERIENCES", color: "text-sky-400" },
];

export const sections = ['About', 'Interests', 'Reading', 'Fun'];

export const sectionData = {
  About: workExperience,
  Interests: [
    { id: 'interest1', company: 'Audiovisual Licensing / DRM', role: '', type: '', period: '', url: '#', icon: Film, hoverText: 'Infrastructure that turns ideas into enduring, transportable assets.' },
    { id: 'interest2', company: 'Content Creation', role: '', type: '', period: '', url: '#', icon: Video, hoverText: 'The canvas where technology, creativity, and community collide.' },
    { id: 'interest3', company: 'FinTech', role: '', type: '', period: '', url: '#', icon: DollarSign, hoverText: 'The operating system for money in a digitized world.' },
    { id: 'interest4', company: 'Social Finance', role: '', type: '', period: '', url: '#', icon: TrendingUp, hoverText: 'The framework that treats reputation and reach as financial assets.' },
    { id: 'interest5', company: 'Cryptography', role: '', type: '', period: '', url: '#', icon: Lock, hoverText: 'The foundation of privacy, ownership, and security in digital economies.' }
  ],
  Reading: [
    { id: 'book1', company: 'The King of Oil', role: 'Daniel Ammann', type: '', period: '', url: '#' },
    { id: 'book2', company: 'A Peer-to-Peer Electronic Cash System', role: 'Satoshi Nakamoto', type: '', period: '', url: '#' },
    { id: 'book3', company: 'What I Wish Someone Had Told Me', role: 'Sam Altman', type: '', period: '', url: 'https://blog.samaltman.com/what-i-wish-someone-had-told-me' },
    { id: 'book4', company: 'Attention is All You Need', role: '', type: '', period: '', url: 'https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf' },
    { id: 'book5', company: 'Zero to One', role: 'Peter Thiel', type: '', period: '', url: 'https://a.co/d/bRSQUy5' },
    { id: 'book6', company: 'Simulacra and Simulations', role: 'Jean Baudrillard', type: '', period: '', url: 'https://web.stanford.edu/class/history34q/readings/Baudrillard/Baudrillard_Simulacra.html' },
    { id: 'book7', company: 'Running Scared', role: 'John L. Smith', type: '', period: '', url: 'https://a.co/d/3tUPYwZ' },
    { id: 'book8', company: 'Suffering = Growth', role: 'Calvin Chen', type: '', period: '', url: 'https://calvinc.substack.com/p/suffering-growth?source=queue' },
    { id: 'book9', company: 'No Rivals: The Prophet, Disciples, Gospel & Kingdom', role: 'Mario Gabriele', type: '', period: '', url: 'https://www.generalist.com/p/founders-fund-1' },
    { id: 'book10', company: 'Teachers and Transmissions of Excellence', role: 'Matt Clancy', type: '', period: '', url: 'https://www.newthingsunderthesun.com/pub/svmf093n/release/6' },
    { id: 'book11', company: 'Nobody Cares', role: 'Ben Horowitz', type: '', period: '', url: 'https://a16z.com/nobody-cares/' },
    { id: 'book12', company: 'Sharing Secrets Among Friends', role: 'Bruce Schneier', type: '', period: '', url: 'https://www.schneier.com/essays/archives/1992/04/sharing_secrets_amon.html' }
  ],
  Fun: [
    { id: 'fun1', company: 'Racquet Sports', role: 'Tennis, Padel, Pickleball', type: '', period: '', url: '#' },
    { id: 'fun2', company: 'Hiking', role: '', type: '', period: '', url: '#' },
    { id: 'fun3', company: 'Surfing', role: '', type: '', period: '', url: '#', hoverText: 'The web and ocean.' },
    { id: 'fun4', company: 'Production', role: 'Visual/Audio', type: '', period: '', url: '#' }
  ]
};