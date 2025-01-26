import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type TextBlockProps = PropsWithChildren<{
  heading?: string;
  className?: string;
}>;

const TextBlock = (props: TextBlockProps) => {
  const classes = classNames('lg:grid grid-cols-4 mb-sm', props.className);

  return (
    <section data-component="TextBlock" className={classes}>
      {/* Gör kontroll på om text finns för h1 */}
      {props.heading && (
        <h1 className="lg:col-span-2 2xl:col-span-1 heading-lg mb-xs">
          {props.heading}
        </h1>
      )}
      <div className="preamble col-start-1 col-span-3">{props.children}</div>
    </section>
  );
};

export default TextBlock;
