import classNames from 'classnames';
import { PortableText } from 'next-sanity';

type TextBlockProps = {
  subheading?: string;
  body?: any[];
  className?: string;
};

const TextBlock = (props: TextBlockProps) => {
  const classes = classNames('lg:grid grid-cols-4 mb-sm', props.className);

  return (
    <section data-component="TextBlock" className={classes}>
      {props.subheading && (
        <h2 className="col-start-2 col-span-2 heading-md mb-4 md:mb-6">
          {props.subheading}
        </h2>
      )}
      {Array.isArray(props.body) && (
        <div className="col-start-2 col-span-2">
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
        </div>
      )}
    </section>
  );
};

export default TextBlock;
