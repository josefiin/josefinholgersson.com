import classNames from 'classnames';

type HighlightTextProps = {
  quote: string;
  className?: string;
};

const HighlightText = (props: HighlightTextProps) => {
  const classes = classNames('lg:grid grid-cols-4 mb-sm', props.className);

  return (
    <div data-component="HighlightText" className={classes}>
      <p className="col-start-2 col-span-2 heading-lg">{props.quote}</p>
    </div>
  );
};

export default HighlightText;
