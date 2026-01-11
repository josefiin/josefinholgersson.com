'use client';

import { useEffect, useState } from 'react';
import ContentWrapper from '@/components/ContentWrapper';
import DragDrop from '@/components/DragDrop';
import { log } from 'console';

const skills = [
  { id: 1, text: 'Tailwind' },
  { id: 2, text: 'Javascript' },
  { id: 3, text: 'React' },
  { id: 4, text: 'Figma' },
];

const SkillPlay = () => {
  const [highestZindex, setHighestZindex] = useState(1);
  const [zindex, setZindex] = useState<{ [key: number]: number }>({});
  const [positions, setPositions] = useState<{
    [key: number]: { x: number; y: number; rotation: number };
  }>({});

  useEffect(() => {
    const initialPositions: {
      [key: number]: { x: number; y: number; rotation: number };
    } = {};

    skills.forEach((pill) => {
      initialPositions[pill.id] = newPosition();
    });

    setPositions(initialPositions);
  }, []);

  const newPosition = () => {
    // Utgår från att ett pill är max 160px height och 800px max-width
    const maxX = window.innerWidth - 400;
    const maxY = window.innerHeight - 80;
    const xPos = Math.floor(Math.random() * (maxX - 400)) + 400;
    // const yPos = Math.floor(Math.random() * (maxY - 80)) + 80;
    const yPos = Math.floor(Math.random() * 80) - 80;
    const randomRotation = Math.random() * 40 - 20; // Ger ett värde mellan -20 och 20

    return { x: xPos, y: yPos, rotation: randomRotation };
  };

  const bringToFront = (id: number) => {
    setHighestZindex((prev) => prev + 1); // Öka zindex-ordningen
    setZindex((prev) => ({ ...prev, [id]: highestZindex + 1 })); // Tilldela det till rätt pill
  };

  return (
    // <ContentWrapper className="relative pt-40 md:pt-72">
    //   {skills.map((pill) => (
    //     <DragDrop
    //       key={pill.id}
    //       text={pill.text}
    //       bringToFront={() => bringToFront(pill.id)}
    //       zIndex={zindex[pill.id] || 1} // Defaultar till 1 om ej satt
    //       x={positions[pill.id]?.x || 0}
    //       y={positions[pill.id]?.y || 0}
    //       rotationValue={positions[pill.id]?.rotation || 0}
    //     />
    //   ))}
    // </ContentWrapper>
    <ContentWrapper className="relative flex flex-wrap overflow-hidden -mx-10 mt-40">
      {skills.map((pill) => (
        <DragDrop
          key={pill.id}
          text={pill.text}
          bringToFront={() => bringToFront(pill.id)}
          zIndex={zindex[pill.id] || 1} // Defaultar till 1 om ej satt
          // x={positions[pill.id]?.x || 0}
          y={positions[pill.id]?.y || 0}
          x={0}
          // y={0}
          rotationValue={positions[pill.id]?.rotation || 0}
        />
      ))}
    </ContentWrapper>
  );
};

export default SkillPlay;
