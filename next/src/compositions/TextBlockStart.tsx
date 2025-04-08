import Button from '@/components/Button';
import Sticker from '@/components/Sticker/Sticker';
import classNames from 'classnames';

type TextBlockStartProps = {
  className?: string;
};

const TextBlockStart = (props: TextBlockStartProps) => {
  const classes = classNames('lg:grid grid-cols-4 gap-6', props.className);

  return (
    <section className={classes}>
      {/* <div className="ml-auto lg:ml-0 col-start-4 mb-8 lg:mb-0">
        <Sticker />
      </div> */}
      <Sticker className="ml-auto lg:ml-0 col-start-4 mb-8 lg:mb-0" />
      <div className="order-first col-start-1 xl:col-span-2 col-span-3">
        <h1 className="heading-lg mb-10 md:mb-12">
          I’m Josefin – a Designer based in Jönköping. I recently completed
          studies in Front-end development to expand my skill set.
        </h1>
        <Button text="Github" href="https://github.com/josefiin" />
      </div>
    </section>
  );
};

export default TextBlockStart;
