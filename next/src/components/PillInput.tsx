'use client';

import { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

type PillInputProps = {
  onAdd: (label: string) => void;
  onClear: () => void;
  onRefresh: () => void;
  canClear: boolean;
  className?: string;
};

const PillInput = (props: PillInputProps) => {
  const { onAdd, onClear, onRefresh, canClear, className } = props;
  const [value, setValue] = useState('');

  const trimmedValue = value.trim();

  const handleAdd = () => {
    if (!trimmedValue) return;
    onAdd(trimmedValue);
    setValue('');
  };

  const buttonClasses =
    'shrink-0 h-12 rounded-full border-2 border-foreground transition-colors duration-300 ease-in-out hover:bg-decoration disabled:opacity-40 disabled:hover:bg-transparent';

  // Ikonknapparna är kvadratiska, Clear växer med sin text.
  const iconButtonClasses = classNames(
    buttonClasses,
    'w-12 flex items-center justify-center',
  );

  // Wrappern bär positioneringen från föräldern, eftersom refresh ligger
  // utanför själva fältet.
  const classes = classNames('flex items-center gap-2', className);

  return (
    <div className={classes}>
      <div className="flex flex-1 min-w-0 items-center gap-2 p-2 rounded-full border-2 border-foreground bg-background/80 backdrop-blur-sm">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleAdd();
          }}
          placeholder="Add a skill…"
          aria-label="Add a skill"
          className="flex-1 min-w-0 bg-transparent px-2 md:px-4 text-lg outline-none placeholder:text-foreground/40"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!trimmedValue}
          aria-label="Add skill"
          className={iconButtonClasses}
        >
          <Image src="/plus.svg" alt="" width={24} height={24} />
        </button>
        <button
          type="button"
          onClick={onClear}
          disabled={!canClear}
          className={classNames(buttonClasses, 'px-4 md:px-6')}
        >
          Clear
        </button>
      </div>

      {/* Ligger utanför fältet och behöver därför egen bakgrund, annars
          syns pillen rakt igenom. */}
      <button
        type="button"
        onClick={onRefresh}
        aria-label="Shuffle skills"
        className={classNames(
          iconButtonClasses,
          'bg-background/80 backdrop-blur-sm',
        )}
      >
        <Image src="/refresh-cw.svg" alt="" width={24} height={24} />
      </button>
    </div>
  );
};

export default PillInput;
