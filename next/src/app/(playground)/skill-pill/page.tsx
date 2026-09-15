import type { Metadata } from 'next';
import SkillPill, { type Skill } from '@/compositions/SkillPill';

export const metadata: Metadata = {
  title: 'Skill pill — Josefin Holgersson',
  description: 'Drag, snurra och lägg till skills på en interaktiv yta.',
};

const skills: Skill[] = [
  { label: 'UX Design' },
  { label: 'React' },
  { label: 'UI Design' },
  { label: 'HTML' },
  { label: 'Tailwind CSS' },
  { label: 'JavaScript' },
  { label: 'User Research' },
  { label: 'Figma' },
  {
    label: 'Hire me',
    href: 'https://www.linkedin.com/in/josefin-holgersson-20438731/',
  },
];

const SkillPillPage = () => {
  return <SkillPill skills={skills} />;
};

export default SkillPillPage;
