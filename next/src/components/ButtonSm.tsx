import classNames from 'classnames';
import Image from 'next/image';

type ButtonSmProps = {
  text: string;
  href: string;
  target?: '_blank' | '_self';
  className?: string;
};

const ButtonSm = (props: ButtonSmProps) => {
  // Sätter ett defaultvärde för target så att den öppnas i ny flik om inget anges
  const { text, href, className, target = '_blank' } = props;
  const classes = classNames(
    'text-xl w-fit flex gap-4 items-center justify-center border-2 border-foreground rounded-full px-6 py-2 hover:bg-decoration transition-colors duration-300 ease-in-out',
    className,
  );

  return (
    <a className={classes} href={href} target={target}>
      <span>{text}</span>
      <Image
        src="./arrow-right_sm.svg"
        alt="arrow right icon"
        width="24"
        height="24"
      />
    </a>
  );
};

export default ButtonSm;
