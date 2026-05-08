import classNames from 'classnames';
import Image from 'next/image';

type ImageTwoColProps = {
  imageLeft?: { url: string; dimensions: { width: number; height: number } };
  imageRight?: { url: string; dimensions: { width: number; height: number } };
  alt?: string;
  className?: string;
};

const ImageTwoCol = (props: ImageTwoColProps) => {
  const classes = classNames(
    'w-full mb-sm grid grid-cols-1 md:grid-cols-2 gap-5',
    props.className,
  );

  return (
    <div className={classes}>
      {props.imageLeft?.url && (
        <Image
          src={props.imageLeft.url}
          alt={props.alt || ''}
          width={props.imageLeft.dimensions.width}
          height={props.imageLeft.dimensions.height}
          quality={100}
          className="w-full h-full object-cover"
        />
      )}
      {props.imageRight?.url && (
        <Image
          src={props.imageRight.url}
          alt={props.alt || ''}
          width={props.imageRight.dimensions.width}
          height={props.imageRight.dimensions.height}
          quality={100}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default ImageTwoCol;
