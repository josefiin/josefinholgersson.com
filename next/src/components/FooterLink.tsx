import Image from 'next/image';

type FooterLinkProps = {
  text: string;
  href: string;
};

const FooterLink = (props: FooterLinkProps) => {
  return (
    <a
      href={props.href}
      target="_blank"
      className="text-4xl md:text-5xl uppercase hover:underline decoration-4 underline-offset-8 flex w-fit gap-4 items-center"
    >
      <div className="w-8 h-8 md:w-14 md:h-14 relative">
        <Image
          fill
          src="arrow-up-right.svg"
          alt="arrow upp right icon"
          className="object-contain" // Ser till att bilden behåller proportioner
        />
      </div>
      <span>{props.text}</span>
    </a>
  );
};

export default FooterLink;

<a href=""></a>;
