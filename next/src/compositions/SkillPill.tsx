'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Pill, { type PillVariant } from '@/components/Pill';
import PillInput from '@/components/PillInput';

export type Skill = {
  label: string;
  href?: string;
};

type SkillPillProps = {
  // Listan att slumpa ur.
  skills: Skill[];
  // Skills som alltid ska visas, oavsett slumpen. Renderas sist och hamnar
  // därmed överst i högen.
  pinnedSkills?: Skill[];
  // Hur många som slumpas fram ur skills.
  count?: number;
};

// Modulnivå för att referensen ska vara stabil mellan renderingar. Ett nytt
// tomt värde per rendering hade fått useEffect att köra om i all oändlighet.
const NO_PINNED_SKILLS: Skill[] = [];

type PlacedPill = Skill & {
  id: string;
  x: number;
  y: number;
  // Måtten sparas för att nästa pill ska kunna placeras på avstånd från detta.
  width: number;
  height: number;
  rotation: number;
  variant: PillVariant;
};

// Höjden som reserveras längst ner så att pillen inte hamnar bakom inmatningen.
const INPUT_AREA_HEIGHT = 110;

// Hur stor del av ett pill som får hamna utanför canvasens sidokanter.
// Noll här: eftersom kandidatsökningen nedan gärna lägger pillen så långt ifrån
// varandra som möjligt hamnar de ändå nära kanterna, och då ska de ligga kvar
// innanför dem.
const OVERHANG = 0;

// Antal kandidatpositioner som testas per pill. Rent slumpade positioner
// klumpar ihop sig förvånansvärt ofta, så varje pill får flera förslag och
// den som hamnar längst från de redan utplacerade vinner. Högre värde ger
// jämnare spridning men mindre slump.
const POSITION_CANDIDATES = 30;

// Pillens textstorlek. Detta är den enda platsen att ändra storleken på:
// värdena används både för CSS-variabeln som Pill läser och för uträkningen
// av var pillen får plats. Ändras de på ett ställe men inte det andra hamnar
// pillen fel utan att något syns i koden.
const FONT_MIN = 32;
const FONT_VW = 4.5;
const FONT_MAX = 120;

const PILL_FONT_SIZE = `clamp(${FONT_MIN}px, ${FONT_VW}vw, ${FONT_MAX}px)`;

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// Fisher-Yates: blandar en kopia av listan och tar de första.
const pickRandom = (items: Skill[], count: number) => {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

// Pillen positioneras från canvasens övre vänstra hörn, så storleken måste
// uppskattas innan de renderas för att de inte ska hamna utanför kanten.
const estimateSize = (label: string, canvasWidth: number) => {
  // Canvasen är lika bred som viewporten, så vw kan räknas om mot canvasbredden.
  const fontSize = Math.min(
    Math.max(FONT_MIN, (canvasWidth * FONT_VW) / 100),
    FONT_MAX,
  );
  // Den stora paddingen slår in först vid lg. Mellan md och lg är canvasen för
  // smal för att bära den, och pillen blir då onödigt breda i förhållande till ytan.
  const isDesktop = canvasWidth >= 1024;
  // Motsvarar px-8/py-2 och px-24/py-8 från brytpunkt lg.
  const horizontalPadding = isDesktop ? 192 : 64;
  const verticalPadding = isDesktop ? 64 : 16;

  // 0.62 är uppmätt mot Switzer: korta versaler som HTML är bredare per tecken
  // än långa ord, så faktorn ligger medvetet i överkant.
  return {
    width: label.length * fontSize * 0.62 + horizontalPadding,
    height: fontSize * 1.1 + verticalPadding,
  };
};

// Kortaste avståndet från en punkt till mittpunkten av redan utplacerade pill.
const distanceToClosest = (
  x: number,
  y: number,
  placed: PlacedPill[],
): number => {
  if (placed.length === 0) return Infinity;

  return Math.min(
    ...placed.map((pill) =>
      Math.hypot(x - (pill.x + pill.width / 2), y - (pill.y + pill.height / 2)),
    ),
  );
};

const placeSkill = (
  skill: Skill,
  id: string,
  canvas: { width: number; height: number },
  placed: PlacedPill[],
): PlacedPill => {
  const size = estimateSize(skill.label, canvas.width);

  // Positionen slumpas utifrån pillets mittpunkt i sidled. Räknat från
  // vänsterkanten skulle breda pill alltid tvingas åt vänster, eftersom deras
  // spelrum krymper med bredden. Mittpunkten ger en jämn fördelning oavsett
  // hur brett pillet är, och tillåter samma överhäng åt båda hållen.
  const halfVisible = size.width * (0.5 - OVERHANG);
  const minCenterX = Math.min(halfVisible, canvas.width / 2);
  const maxCenterX = Math.max(minCenterX, canvas.width - halfVisible);
  const maxY = Math.max(0, canvas.height - size.height - INPUT_AREA_HEIGHT);

  let bestX = 0;
  let bestY = 0;
  let bestDistance = -1;

  for (let i = 0; i < POSITION_CANDIDATES; i++) {
    const centerX = randomBetween(minCenterX, maxCenterX);
    const y = randomBetween(0, maxY);
    const distance = distanceToClosest(centerX, y + size.height / 2, placed);

    if (distance > bestDistance) {
      bestDistance = distance;
      bestX = centerX - size.width / 2;
      bestY = y;
    }
  }

  return {
    ...skill,
    id,
    x: bestX,
    y: bestY,
    width: size.width,
    height: size.height,
    rotation: randomBetween(-25, 25),
    variant: Math.random() < 0.5 ? 'decoration' : 'background',
  };
};

const SkillPill = (props: SkillPillProps) => {
  const { skills, pinnedSkills = NO_PINNED_SKILLS, count = 8 } = props;

  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [pills, setPills] = useState<PlacedPill[]>([]);
  const [zIndexes, setZIndexes] = useState<Record<string, number>>({});

  const highestZIndex = useRef(1);
  const nextId = useRef(0);
  const hasScattered = useRef(false);

  const createId = () => {
    nextId.current += 1;

    return `pill-${nextId.current}`;
  };

  // Mäter canvasen och sprider ut ett slumpat urval första gången.
  // All slump sker efter mount för att undvika skillnader mot serverrenderingen.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const update = () => {
      const rect = canvas.getBoundingClientRect();

      // Samma mått ska inte ge ny state, annars renderar varje resize-event om
      // alla pill i onödan.
      setCanvasSize((previous) =>
        previous.width === rect.width && previous.height === rect.height
          ? previous
          : { width: rect.width, height: rect.height },
      );

      if (!hasScattered.current && rect.width > 0) {
        hasScattered.current = true;

        const selected = [...pickRandom(skills, count), ...pinnedSkills];
        const placed: PlacedPill[] = [];

        selected.forEach((skill) => {
          placed.push(
            placeSkill(
              skill,
              createId(),
              { width: rect.width, height: rect.height },
              placed,
            ),
          );
        });

        setPills(placed);
      }
    };

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, [skills, pinnedSkills, count]);

  const bringToFront = useCallback((id: string) => {
    highestZIndex.current += 1;
    const zIndex = highestZIndex.current;
    setZIndexes((previous) =>
      previous[id] === zIndex ? previous : { ...previous, [id]: zIndex },
    );
  }, []);

  const addPill = (label: string) => {
    const id = createId();
    setPills((previous) => [
      ...previous,
      placeSkill({ label }, id, canvasSize, previous),
    ]);
    bringToFront(id);
  };

  const clearPills = () => setPills([]);

  return (
    <div
      ref={canvasRef}
      style={{ '--pill-font-size': PILL_FONT_SIZE } as React.CSSProperties}
      className="relative w-full overflow-hidden mt-16 lg:mt-24 h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-6rem)]"
    >
      <AnimatePresence>
        {pills.map((pill) => (
          <Pill
            key={pill.id}
            label={pill.label}
            href={pill.href}
            x={pill.x}
            y={pill.y}
            rotation={pill.rotation}
            variant={pill.variant}
            zIndex={zIndexes[pill.id] || 1}
            bringToFront={() => bringToFront(pill.id)}
            canvasSize={canvasSize}
          />
        ))}
      </AnimatePresence>

      <PillInput
        onAdd={addPill}
        onClear={clearPills}
        canClear={pills.length > 0}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[min(92vw,560px)]"
      />
    </div>
  );
};

export default SkillPill;
