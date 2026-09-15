import type { Metadata } from 'next';
import SkillPill, { type Skill } from '@/compositions/SkillPill';

export const metadata: Metadata = {
  title: 'Skill pill — Josefin Holgersson',
  description: 'Dra, snurra och lägg till skills på en interaktiv yta.',
};

// Åtta av dessa slumpas fram vid varje sidladdning.
const skills: Skill[] = [
  { label: 'UX Design' },
  { label: 'React' },
  { label: 'UI Design' },
  { label: 'HTML' },
  { label: 'Tailwind CSS' },
  { label: 'JavaScript' },
  { label: 'User Research' },
  { label: 'Figma' },
  { label: 'Prototyping' },
  { label: 'Adobe CC' },
  { label: 'Branding' },
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
