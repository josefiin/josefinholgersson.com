import classNames from 'classnames';
import { PortableText } from 'next-sanity';
import { PropsWithChildren } from 'react';

type SubheadingBlockProps = PropsWithChildren<{
  heading?: string;
  body?: any[];
  className?: string;
}>;

const SubheadingBlock = (props: SubheadingBlockProps) => {
  const classes = classNames('lg:grid grid-cols-4 mb-xs', props.className);

  return (
    <div data-component="SubheadingBlock" className={classes}>
      <h2 className="text-sm font-medium tracking-wide col-start-1 col-span-2 mb-2 md:mb-3">
        {props.heading}
      </h2>
      <div className="col-start-1 col-span-2">
        {/* Rendera PortableText om body finns, annars children */}
        {props.body ? <PortableText value={props.body} /> : props.children}
      </div>
    </div>
  );
};

export default SubheadingBlock;
