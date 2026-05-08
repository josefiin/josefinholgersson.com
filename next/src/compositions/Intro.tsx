import classNames from 'classnames';
import { PortableText } from 'next-sanity';
import { PropsWithChildren } from 'react';

type IntroProps = PropsWithChildren<{
  heading?: string;
  body?: any[];
  className?: string;
}>;

const Intro = (props: IntroProps) => {
  const classes = classNames('lg:grid grid-cols-4 mb-sm', props.className);

  return (
    <section data-component="Intro" className={classes}>
      {/* Gör kontroll på om text finns för h1 */}
      {props.heading && (
        <h1 className="lg:col-span-2 2xl:col-span-1 heading-lg mb-xs">
          {props.heading}
        </h1>
      )}
      <div className="preamble col-start-1 col-span-3">
        {props.body ? (
          <PortableText
            value={props.body}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="mb-xs last:mb-0">{children}</p>
                ),
              },
            }}
          />
        ) : (
          props.children
        )}
      </div>
    </section>
  );
};

export default Intro;
