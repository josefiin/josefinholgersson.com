'use client';

import { useState } from 'react';
import classNames from 'classnames';

type PillInputProps = {
  onAdd: (label: string) => void;
  onClear: () => void;
  canClear: boolean;
  className?: string;
};

const PillInput = (props: PillInputProps) => {
  const { onAdd, onClear, canClear, className } = props;
  const [value, setValue] = useState('');

  const trimmedValue = value.trim();

  const handleAdd = () => {
    if (!trimmedValue) return;
    onAdd(trimmedValue);
    setValue('');
  };

  const buttonClasses =
    'shrink-0 h-12 px-4 md:px-6 rounded-full border-2 border-foreground transition-colors duration-300 ease-in-out disabled:opacity-40 disabled:hover:bg-transparent';

  const classes = classNames(
    'flex items-center gap-2 p-2 rounded-full border-2 border-foreground bg-background/80 backdrop-blur-sm',
    className,
  );

  return (
    <div className={classes}>
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
        className={classNames(buttonClasses, 'hover:bg-decoration')}
      >
        Add
      </button>
      <button
        type="button"
        onClick={onClear}
        disabled={!canClear}
        className={classNames(buttonClasses, 'hover:bg-decoration')}
      >
        Clear all
      </button>
    </div>
  );
};

export default PillInput;
