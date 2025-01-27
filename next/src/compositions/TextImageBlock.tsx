import Button from '@/components/Button';
import classNames from 'classnames';
import Image from 'next/image';

type TextImageBlockProps = {
  text: string;
  buttonText: string;
  buttonHref: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

const TextImageBlock = (props: TextImageBlockProps) => {
  const classes = classNames('lg:grid grid-cols-4 gap-6', props.className);

  return (
    <section className={classes}>
      {/* Kontrollerar om värde finns i src och alt för Image, skapar bild */}
      {props.imageSrc && props.imageAlt && (
        <div className="w-2/5 sm:w-fit ml-auto lg:ml-0 col-start-4 mb-8 lg:mb-0">
          <Image
            src={props.imageSrc}
            alt={props.imageAlt}
            width="220"
            height="220"
          />
        </div>
      )}
      <div className="order-first col-start-1 xl:col-span-2 col-span-3">
        <h1 className="heading-lg mb-10 md:mb-12">{props.text}</h1>
        <Button text={props.buttonText} href={props.buttonHref} />
      </div>
    </section>
  );
};

export default TextImageBlock;
