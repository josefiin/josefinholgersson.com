import classNames from 'classnames';

type ProjectTagProps = {
  label: string;
  className?: string;
};

const ProjectTag = (props: ProjectTagProps) => {
  const classes = classNames(
    'text-xs text-stone-700 py-1 px-4 backdrop-blur-sm bg-white/40 rounded-full',
    props.className,
  );

  return <span className={classes}>{props.label}</span>;
};

export default ProjectTag;
