import classNames from 'classnames';
import Link from 'next/link';

type NavLinkProps = {
  text: string;
  href: string;
  // Gör det möjigt att lägga på fler klasser på komponenten.
  className?: string;
};

const NavLink = (props: NavLinkProps) => {
  // styling för länken lägger jag här.
  const classes = classNames(
    'underline-offset-8 decoration-1',
    'hover:underline',
    props.className,
  );

  return (
    <Link href={props.href} className={classes}>
      {props.text}
    </Link>
  );
};

export default NavLink;
