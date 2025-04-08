import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/client';
import Image from 'next/image';
import ContentWrapper from '@/components/ContentWrapper';
import ProjectCard from '@/compositions/ProjectCard';
import TextBlockStart from '@/compositions/TextBlockStart';
import Sticker from '@/components/Sticker/Sticker';

const casesQuery = `
*[_type == "case" && defined(slug.current)] | order(_createdAt desc){
  _id,
  title,
  slug,
  tags,
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
      <div className="pt-16 lg:pt-24 pb-6 md:pb-10 mb-lg h-dscreen grid gap-6 grid-rows-[1fr_auto]">
        <div className="flex items-center">
          <TextBlockStart />
        </div>
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
            <ProjectCard
              className="col-span-2"
              key={item._id}
              title={item.title}
              slug={item.slug.current}
              image={{
                url: item.thumbnailImage.url,
                alt: item.title,
                // Använder bredd och höjd från den uppladdade bilden i sanity
                width: item.thumbnailImage.dimensions.width,
                height: item.thumbnailImage.dimensions.height,
              }}
              tags={item.tags || []} // Om inga tags finns, skicka en tom array
            />
          ))}
        </section>
        <div className="w-full"></div>
      </ContentWrapper>
    </>
  );
};

export default Page;
