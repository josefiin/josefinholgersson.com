import * as motion from 'motion/react-client';
import TextCircle from './TextCircle';
import Eyes from './Eyes';
import classNames from 'classnames';

type StickerProps = {
  className?: string;
};

const Sticker = (props: StickerProps) => {
  const classes = classNames(
    'w-36 h-36 md:w-56 md:h-56 bg-decoration rounded-full flex items-center justify-center relative',
    props.className,
  );

  return (
    <div className={classes}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
      >
        <TextCircle className="w-full" />
      </motion.div>
      <Eyes className="absolute h-full" />
    </div>
  );
};

export default Sticker;
