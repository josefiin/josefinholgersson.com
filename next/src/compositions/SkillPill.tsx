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
  skills: Skill[];
};

type PlacedPill = Skill & {
  id: string;
  x: number;
  y: number;
  rotation: number;
  variant: PillVariant;
};

// Höjden som reserveras längst ner så att pillen inte hamnar bakom inmatningen.
const INPUT_AREA_HEIGHT = 140;

// Hur stor del av ett pill som får hamna utanför canvasens sidokanter.
const OVERHANG = 0.1;

// Pillens textstorlek. Detta är den enda platsen att ändra storleken på:
// värdena används både för CSS-variabeln som Pill läser och för uträkningen
// av var pillen får plats. Ändras de på ett ställe men inte det andra hamnar
// pillen fel utan att något syns i koden.
const FONT_MIN = 32;
const FONT_VW = 7;
const FONT_MAX = 120;

const PILL_FONT_SIZE = `clamp(${FONT_MIN}px, ${FONT_VW}vw, ${FONT_MAX}px)`;

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// Pillen positioneras från canvasens övre vänstra hörn, så storleken måste
// uppskattas innan de renderas för att de inte ska hamna utanför kanten.
const estimateSize = (label: string, canvasWidth: number) => {
  // Canvasen är lika bred som viewporten, så vw kan räknas om mot canvasbredden.
  const fontSize = Math.min(
    Math.max(FONT_MIN, (canvasWidth * FONT_VW) / 100),
    FONT_MAX,
  );
  const isDesktop = canvasWidth >= 768;
  // Motsvarar px-8/py-2 på mobil och px-24/py-8 från brytpunkt md.
  const horizontalPadding = isDesktop ? 192 : 64;
  const verticalPadding = isDesktop ? 64 : 16;

  // 0.62 är uppmätt mot Switzer: korta versaler som HTML är bredare per tecken
  // än långa ord, så faktorn ligger medvetet i överkant.
  return {
    width: label.length * fontSize * 0.62 + horizontalPadding,
    height: fontSize * 1.1 + verticalPadding,
  };
};

const placeSkill = (
  skill: Skill,
  id: string,
  canvas: { width: number; height: number },
): PlacedPill => {
  const size = estimateSize(skill.label, canvas.width);

  // Positionen slumpas utifrån pillets mittpunkt i sidled. Räknat från
  // vänsterkanten skulle breda pill alltid tvingas åt vänster, eftersom deras
  // spelrum krymper med bredden. Mittpunkten ger en jämn fördelning oavsett
  // hur brett pillet är, och tillåter samma överhäng åt båda hållen.
  const halfVisible = size.width * (0.5 - OVERHANG);
  const centerX =
    halfVisible * 2 > canvas.width
      ? canvas.width / 2
      : randomBetween(halfVisible, canvas.width - halfVisible);

  const maxY = Math.max(0, canvas.height - size.height - INPUT_AREA_HEIGHT);

  return {
    ...skill,
    id,
    x: centerX - size.width / 2,
    y: randomBetween(0, maxY),
    rotation: randomBetween(-25, 25),
    variant: Math.random() < 0.5 ? 'decoration' : 'background',
  };
};

const SkillPill = (props: SkillPillProps) => {
  const { skills } = props;

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

  // Mäter canvasen och sprider ut de fördefinierade skills:en första gången.
  // All slump sker efter mount för att undvika skillnader mot serverrenderingen.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const update = () => {
      const rect = canvas.getBoundingClientRect();
      setCanvasSize({ width: rect.width, height: rect.height });

      if (!hasScattered.current && rect.width > 0) {
        hasScattered.current = true;
        setPills(
          skills.map((skill) =>
            placeSkill(skill, createId(), {
              width: rect.width,
              height: rect.height,
            }),
          ),
        );
      }
    };

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, [skills]);

  const bringToFront = useCallback((id: string) => {
    highestZIndex.current += 1;
    const zIndex = highestZIndex.current;
    setZIndexes((previous) =>
      previous[id] === zIndex ? previous : { ...previous, [id]: zIndex },
    );
  }, []);

  const addPill = (label: string) => {
    const id = createId();
    setPills((previous) => [...previous, placeSkill({ label }, id, canvasSize)]);
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
