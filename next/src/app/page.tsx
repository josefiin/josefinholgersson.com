import Link from 'next/link';
import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/client';
import Image from 'next/image';
import TextImageBlock from '@/compositions/TextImageBlock';
import ContentWrapper from '@/components/ContentWrapper';

const casesQuery = `
*[_type == "case" && defined(slug.current)] | order(_createdAt desc){
  _id,
  title,
  slug,
  "thumbnailImage": {
    "url": thumbnail.asset->url,
    "dimensions": thumbnail.asset->metadata.dimensions,
  }
}`;
const options = { next: { revalidate: 30 } };

const Page = async () => {
  const cases = await client.fetch<SanityDocument[]>(casesQuery, {}, options);

  return (
    <>
      <div className="pt-20 md:pt-72 pb-6 md:pb-10 mb-lg h-dscreen grid grid-rows-[1fr_auto]">
        <TextImageBlock
          imageSrc="Design-sticker.svg"
          imageAlt="Designer front-end svg"
          text="I’m Josefin – a Designer based in Jönköping, Sweden. I recently completed studies in Front-end development to expand my skill set."
          buttonText="Github"
          buttonHref="https://github.com/josefiin"
        />
        <div className="w-full flex items-end">
          <Image
            className="w-full"
            src="design-frontend_text.svg"
            alt="design-frontend_text"
            width="100"
            height="100"
          />
        </div>
      </div>
      <ContentWrapper>
        {/* Id för ankarlänk för work i navigering */}
        <section
          id="case-section"
          className="md:grid grid-cols-4 gap-20 pt-20 -mt-20"
        >
          {cases.map((item) => (
            <div className="col-span-2 mb-8 md:mb-0" key={item._id}>
              <Link href={`/${item.slug.current}`}>
                <div className="overflow-hidden mb-2 md:mb-4">
                  {/* Visar thumbnail */}
                  <Image
                    src={item.thumbnailImage.url}
                    alt={item.title}
                    // Använder bredd och höjd från den uppladdade bilden i sanity
                    width={item.thumbnailImage.dimensions.width}
                    height={item.thumbnailImage.dimensions.height}
                    quality={100}
                    className="w-full hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </div>
                {/* Visar titel */}
                <h2 className="heading-md">{item.title}</h2>
              </Link>
            </div>
          ))}
        </section>
      </ContentWrapper>
    </>
  );
};

export default Page;
