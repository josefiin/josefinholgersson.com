import classNames from 'classnames';
import { PortableText } from 'next-sanity';
import { PropsWithChildren } from 'react';

type InfoSectionProps = PropsWithChildren<{
  heading?: string;
  body?: any[];
  className?: string;
}>;

const InfoSection = (props: InfoSectionProps) => {
  const classes = classNames('lg:grid grid-cols-4 mb-xs', props.className);
  console.log(props);

  return (
    <section data-component="InfoSection" className={classes}>
      {props.heading && (
        <h2 className="text-sm font-medium tracking-wide col-start-1 col-span-2 mb-2 md:mb-3">
          {props.heading}
        </h2>
      )}
      <div className="col-start-1 col-span-2">
        {props.body ? (
          <PortableText
            value={props.body}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="mb-6 last:mb-0">{children}</p>
                ),
              },
              marks: {
                link: ({ children, value }) => {
                  const target = value.target || '_self';

                  return (
                    <a
                      href={value.href}
                      target={target}
                      rel={target === '_blank' ? 'noopener' : undefined}
                    >
                      {children}
                    </a>
                  );
                },
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

export default InfoSection;
