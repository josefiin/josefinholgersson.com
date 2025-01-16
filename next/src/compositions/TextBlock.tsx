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
      {/* {props.text2 && (
        <p className="preamble col-start-1 col-span-3 mt-8 lg:mt-14">
          {props.text2}
        </p>
      )} */}
      {/* Gör kontroll på värde för knapp */}
      {/* {props.buttonText && props.buttonHref && (
        <Button
          className="mt-sm col-start-1"
          text={props.buttonText}
          href={props.buttonHref}
        />
      )} */}
    </section>
  );
};

export default TextBlock;
