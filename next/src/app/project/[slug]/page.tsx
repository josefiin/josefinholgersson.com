import type { SanityDocument } from 'next-sanity';
import { client } from '@/sanity/client';
import ContentWrapper from '@/components/ContentWrapper';
import PageBuilder from '@/compositions/PageBuilder';

export const revalidate = 600;

export async function generateStaticParams() {
  const pageData = await client.fetch('*[_type == "case"]{slug}');
  return pageData.map((page: any) => ({ slug: page.slug.current }));
}

const POST_QUERY = `*[_type == "case" && slug.current == $slug][0]{
  title,
  slug,
  content[]{
    ...,
    _type == "fullWidthImage" => {
      _type,
      alt,
      "image": image{
        "url": asset->url,
        "dimensions": asset->metadata.dimensions,
      }
    },
    _type == "imageTwoCol" => {
      _type,
      alt,
      "imageLeft": imageLeft{
        "url": asset->url,
        "dimensions": asset->metadata.dimensions,
      },
      "imageRight": imageRight{
        "url": asset->url,
        "dimensions": asset->metadata.dimensions,
      }
    }
  }
}`;

type CasePageType = { params: Promise<{ slug: string }> };

const CasePage = async (props: CasePageType) => {
  const params = await props.params;
  const caseData = await client.fetch<SanityDocument>(POST_QUERY, params);

  if (!caseData) return <div>Cannot find case.</div>;

  return (
    <ContentWrapper className="pt-40 md:pt-72">
      {Array.isArray(caseData.content) && (
        <PageBuilder
          blocks={caseData.content}
          title={caseData.title}
          context="case"
        />
      )}
    </ContentWrapper>
  );
};

export default CasePage;
