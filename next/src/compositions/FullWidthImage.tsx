import classNames from 'classnames';
import Image from 'next/image';

type FullWidthImageProps = {
  imageSrc: string;
  altText: string;
  imgWidth: number;
  imgHeight: number;
  className?: string;
};

const FullWidthImage = (props: FullWidthImageProps) => {
  const classes = classNames('w-full mb-sm', props.className);

  return (
    <div className={classes}>
      <Image
        src={props.imageSrc}
        alt={props.altText}
        width={props.imgWidth}
        height={props.imgHeight}
        quality={100}
        className="w-full"
      />
    </div>
  );
};

export default FullWidthImage;
