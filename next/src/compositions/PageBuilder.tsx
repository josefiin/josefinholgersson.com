'use client';

import Intro from '@/compositions/Intro';
import TextBlock from '@/compositions/TextBlock';
import InfoSection from '@/compositions/InfoSection';
import FullWidthImage from '@/compositions/FullWidthImage';
import ImageTwoCol from '@/compositions/ImageTwoCol';
import HighlightText from '@/compositions/HighlightText';
import Button from '@/components/Button';
import ButtonSm from '@/components/ButtonSm';

type PageBuilderProps = {
  blocks: any[];
  title?: string;
  context?: 'page' | 'case';
};

const PageBuilder = ({ blocks, title, context = 'page' }: PageBuilderProps) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const key = block._key || index;

        const imageTypes = ['fullWidthImage', 'imageTwoCol'];
        const nextBlock = blocks[index + 1];
        const nextIsImage = nextBlock && imageTypes.includes(nextBlock._type);
        const currentIsImage = imageTypes.includes(block._type);
        const spacingClass = currentIsImage && nextIsImage ? 'mb-5' : 'mb-sm';

        switch (block._type) {
          case 'introBlock':
            return (
              <Intro
                key={key}
                heading={block.heading || title}
                body={block.content}
              />
            );

          case 'textBlock':
            return (
              <TextBlock
                key={key}
                subheading={block.subheading}
                body={block.content}
              />
            );

          case 'infoSection':
            return (
              <InfoSection
                key={key}
                heading={block.heading}
                body={block.content}
              />
            );

          case 'linkSection':
            return (
              <div
                key={key}
                className="md:flex gap-4 mb-sm [&>*:not(:last-child)]:mb-4 [&>*:not(:last-child)]:md:mb-0"
              >
                {Array.isArray(block.links) &&
                  block.links.map((link: any) =>
                    context === 'case' ? (
                      <ButtonSm
                        key={link._key}
                        text={link.text}
                        href={link.href}
                        className="w-full md:w-auto"
                      />
                    ) : (
                      <Button
                        key={link._key}
                        text={link.text}
                        href={link.href}
                        target={link.target}
                      />
                    ),
                  )}
              </div>
            );

          case 'fullWidthImage':
            return block.image?.url ? (
              <FullWidthImage
                key={key}
                imageSrc={block.image.url}
                altText={block.alt || title || ''}
                imgWidth={block.image.dimensions.width}
                imgHeight={block.image.dimensions.height}
                className={spacingClass}
              />
            ) : null;

          case 'imageTwoCol':
            return (
              <ImageTwoCol
                key={key}
                imageLeft={block.imageLeft}
                imageRight={block.imageRight}
                className={spacingClass}
                alt={block.alt}
              />
            );

          case 'highlightText':
            return block.quote ? (
              <HighlightText key={key} quote={block.quote} />
            ) : null;

          default:
            console.warn('Unknown block type:', block._type);
            return null;
        }
      })}
    </>
  );
};

export default PageBuilder;
