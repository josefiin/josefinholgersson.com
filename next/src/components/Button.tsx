import classNames from 'classnames';
import Image from 'next/image';

type ButtonProps = {
  text: string;
  href: string;
  target?: '_blank' | '_self';
  className?: string;
};

const Button = (props: ButtonProps) => {
  // Sätter ett defaultvärde för target så att den öppnas i ny flik om inget anges
  const { text, href, className, target = '_blank' } = props;
  const classes = classNames(
    'text-3xl w-fit flex gap-4 items-center justify-center border-2 border-foreground rounded-full px-10 py-2 hover:bg-decoration transition-colors duration-300 ease-in-out',
    className,
  );

  return (
    <a href={href} target={target} className={classes}>
      <span>{text}</span>
      <Image
        src="./arrow-right.svg"
        alt="arrow right icon"
        width="40"
        height="40"
      />
    </a>
  );
};

export default Button;
