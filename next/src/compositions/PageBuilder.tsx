'use client';

import TextBlock from '@/compositions/TextBlock';
import Button from '../components/Button';
import InfoSection from './InfoSection';
// import FullWidthImage from './blocks/fullWidthImage';

type PageBuilderProps = {
  blocks: any[];
};

const PageBuilder = ({ blocks }: PageBuilderProps) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        switch (block._type) {
          case 'infoSection':
            return (
              <InfoSection
                key={index}
                heading={block.heading}
                body={block.content}
              />
            );

          case 'textBlock':
            return (
              <TextBlock
                key={index}
                heading={block.heading}
                body={block.content}
              />
            );

          case 'linkSection':
            return (
              <Button
                key={index}
                text={block.label}
                href={block.href}
                target={block.target}
              />
            );

          // case 'fullWidthImage':
          // return (
          //   <FullWidthImage
          //     key={index}
          //     imageSrc={block.image?.asset?.url || ''}
          //     altText={block.image?.alt || 'Bild'}
          //     imgWidth={block.image?.asset?.metadata?.dimensions?.width || 1200}
          //     imgHeight={block.image?.asset?.metadata?.dimensions?.height || 800}
          //   />
          // );

          default:
            console.warn('Unknown block type:', block._type);

            return null;
        }
      })}
    </>
  );
};

export default PageBuilder;
