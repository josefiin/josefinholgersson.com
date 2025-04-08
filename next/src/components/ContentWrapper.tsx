import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type ContentWrapperProps = PropsWithChildren<{
  className?: string;
}>;

const ContentWrapper = (props: ContentWrapperProps) => {
  const classes = classNames('mx-auto max-w-[1728px', props.className);

  return <div className={classes}>{props.children}</div>;
};

export default ContentWrapper;
