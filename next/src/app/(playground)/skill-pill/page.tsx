import type { Metadata } from 'next';
import SkillPill, { type Skill } from '@/compositions/SkillPill';

export const metadata: Metadata = {
  title: 'Skill pills — Josefin Holgersson',
  description: 'Dra, snurra och lägg till skills på en interaktiv yta.',
};

// Åtta av dessa slumpas fram vid varje sidladdning.
const skills: Skill[] = [
  { label: 'UX design' },
  { label: 'Food & wine lover' },
  { label: 'React' },
  { label: 'Designated designer' },
  { label: 'User research' },
  { label: 'Mother of girls' },
  { label: 'UI design' },
  { label: 'Book club member' },
  { label: 'Tailwind' },
  { label: 'Curious' },
  { label: 'Prototyping' },
  { label: 'Culture addict' },
  { label: 'JavaScript' },
  { label: 'Design thinking' },
  { label: 'Figma' },
  { label: 'Accessibility' },
  { label: 'HTML' },
  { label: 'Branding' },
  { label: 'Collaborative' },
  { label: 'AI-Oriented' },
  { label: 'User-centered design' },
  { label: 'Adobe CC' },
  { label: 'Visual identity' },
  { label: 'Wireframing' },
];

// Visas alltid, utöver de slumpade.
const pinnedSkills: Skill[] = [
  {
    label: 'Hire me',
    href: 'https://www.linkedin.com/in/josefin-holgersson-20438731/',
  },
];

const SkillPillPage = () => {
  return <SkillPill skills={skills} pinnedSkills={pinnedSkills} count={8} />;
};

export default SkillPillPage;
