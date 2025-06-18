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
    'text-2xl md:text-3xl w-fit h-14 flex gap-4 items-center justify-center border-2 border-foreground rounded-full px-8 md:px-10 hover:bg-decoration transition-colors duration-300 ease-in-out',
    className,
  );

  return (
    <a href={href} target={target} className={classes}>
      <span>{text}</span>
      <Image
        className="hidden md:block md:h-10 md:w-10"
        src="./arrow-right.svg"
        alt="arrow right icon"
        width="40"
        height="40"
      />
      <Image
        className="block h-8 w-8 md:hidden"
        src="/arrow-right_m.svg"
        alt="arrow right icon"
        width="32"
        height="32"
      />
    </a>
  );
};

export default Button;
