import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type ExternalLinkProps = PropsWithChildren<{
  href: string;
  className?: string;
  target?: '_blank' | '_self';
}>;

const ExternalLink = (props: ExternalLinkProps) => {
  // Sätter ett defaultvärde för target så att den öppnas i ny flik om inget anges
  const { className, href, children, target = '_blank' } = props;

  const classes = classNames('hover:text-neutral-500', className);

  return (
    <a href={href} target={target} className={classes}>
      {children}
    </a>
  );
};

export default ExternalLink;
