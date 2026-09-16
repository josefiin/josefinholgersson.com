'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, type PanInfo } from 'motion/react';
import classNames from 'classnames';

export type PillVariant = 'decoration' | 'background';

type PillProps = {
  label: string;
  x: number;
  y: number;
  rotation: number;
  variant: PillVariant;
  zIndex: number;
  bringToFront: () => void;
  canvasSize: { width: number; height: number };
  href?: string;
};

const Pill = (props: PillProps) => {
  const {
    label,
    x: initialX,
    y: initialY,
    rotation,
    variant,
    zIndex,
    bringToFront,
    canvasSize,
    href,
  } = props;

  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);
  const rotate = useMotionValue(rotation);

  // Håller reda på rotationen mellan dragningar så att den inte nollställs.
  const currentRotation = useRef(rotation);
  // Skiljer en dragning från ett klick, så att länken inte triggas vid drag.
  const wasDragged = useRef(false);

  const elementRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Mäter pillets storlek för att kunna begränsa dragytan.
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const measure = () => {
      // offsetWidth/offsetHeight ger måtten utan transform. getBoundingClientRect
      // hade gett den roterade ytan, vilket är större än pillet faktiskt är.
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
    };

    measure();
    window.addEventListener('resize', measure);

    return () => window.removeEventListener('resize', measure);
  }, [label]);

  // Låter knappt hälften av pillet sticka utanför kanten, men inte mer.
  const constraints = {
    left: -size.width * 0.45,
    right: Math.max(0, canvasSize.width - size.width * 0.55),
    top: -size.height * 0.45,
    bottom: Math.max(0, canvasSize.height - size.height * 0.55),
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Har användaren dragit pillet ska länken inte öppnas.
    if (wasDragged.current) {
      event.preventDefault();
      wasDragged.current = false;
    }
  };

  const pillClasses = classNames(
    'rounded-full border-2 lg:border-4 border-foreground text-foreground text-center leading-none whitespace-nowrap px-8 py-2 lg:px-24 lg:py-8 text-[length:var(--pill-font-size)]',
    variant === 'decoration' ? 'bg-decoration' : 'bg-background',
  );

  const content = <div className={pillClasses}>{label}</div>;

  return (
    <motion.div
      ref={elementRef}
      drag
      dragConstraints={constraints}
      dragElastic={0}
      dragMomentum={false}
      onPointerDown={bringToFront}
      onDragStart={() => {
        bringToFront();
        wasDragged.current = false;
      }}
      onDrag={(_, info: PanInfo) => {
        wasDragged.current = true;
        // Rotationen styrs av dragriktningen: höger ger medurs, vänster moturs.
        // Vertikal rörelse bidrar omvänt för en naturligare lutning.
        currentRotation.current += (info.delta.x - info.delta.y * 0.5) * 0.08;
        rotate.set(currentRotation.current);
      }}
      whileTap={{ cursor: 'grabbing' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        x,
        y,
        rotate,
        zIndex,
        cursor: 'grab',
        touchAction: 'none',
      }}
      className="select-none w-fit"
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          // Länkar går att dra som standard i webbläsaren. Den inbyggda
          // dragningen äter upp pekarhändelserna innan Motion ser dem, så
          // pillet skulle inte gå att flytta alls utan detta.
          draggable={false}
          className="block"
          style={{ cursor: 'inherit' }}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
};

export default Pill;
