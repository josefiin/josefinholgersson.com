import classNames from 'classnames';

type ProjectTagProps = {
  label: string;
  className?: string;
};

const ProjectTag = (props: ProjectTagProps) => {
  const classes = classNames(
    'text-xs text-stone-800 py-1 px-4 backdrop-blur-sm bg-white/50 rounded-full',
    props.className,
  );

  return <span className={classes}>{props.label}</span>;
};

export default ProjectTag;
