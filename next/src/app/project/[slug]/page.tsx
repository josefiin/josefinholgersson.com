import { PortableText, type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/client';
import InfoSection from '@/compositions/InfoSection';
import ContentWrapper from '@/components/ContentWrapper';
import Image from 'next/image';
import ButtonSm from '@/components/ButtonSm';
import TextBlock from '@/compositions/TextBlock';
// Ser till så att sidorna blir statiskt genererade.
export const dynamic = 'force-static';

// Följt Sanitys "getting started guide" för hjälp med kod och hämta data från Sanity.
// Hämtar url för bilder direkt i queryn
const POST_QUERY = `*[_type == "case" && slug.current == $slug][0] {
..., images[]{
  _key,
  "url": asset->url,
  "dimensions": asset->metadata.dimensions,
}
}`;

const options = { next: { revalidate: 30 } };

type CasePageType = { params: Promise<{ slug: string }> };

const CasePage = async (props: CasePageType) => {
  const params = await props.params;
  const caseData = await client.fetch<SanityDocument>(
    POST_QUERY,
    params,
    options,
  );

  return (
    <ContentWrapper className="pt-40 md:pt-72">
      {/* Lägger ut content på sidan*/}
      <TextBlock heading={caseData.title}>
        {Array.isArray(caseData.body) && <PortableText value={caseData.body} />}
      </TextBlock>
      {/* Info-texter kommer in via caseData.info och är en array med object i.*/}
      <section className="mb-sm col-start-1 col-span-1">
        {Array.isArray(caseData.info) &&
          caseData.info.map((item, index) => (
            <InfoSection
              key={item._key}
              heading={item.title}
              body={item.body}
            />
          ))}
      </section>

      <div className="md:flex gap-4 mb-sm [&>*:not(:last-child)]:mb-4 [&>*:not(:last-child)]:md:mb-0">
        {/* Varje knapp utom den sista mb-4 i mobil. */}
        {Array.isArray(caseData.links) &&
          caseData.links.map((item) => (
            <ButtonSm
              key={item._key}
              text={item.text}
              href={item.href}
              className="w-full md:w-auto"
            />
          ))}
      </div>

      <div className="w-full">
        {Array.isArray(caseData.images) &&
          caseData.images.map((image) => {
            return (
              image && (
                <Image
                  key={image._key}
                  src={image.url}
                  alt={caseData.title}
                  // Använder bredd och höjd från den uppladdade bilden i sanity
                  width={image.dimensions.width}
                  height={image.dimensions.height}
                  quality={100}
                  className="w-full mb-5"
                />
              )
            );
          })}
      </div>
    </ContentWrapper>
  );
};

export default CasePage;
