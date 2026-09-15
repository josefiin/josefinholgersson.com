import type { SanityDocument } from 'next-sanity';
import { client } from '@/sanity/client';
import ContentWrapper from '@/components/ContentWrapper';
import PageBuilder from '@/compositions/PageBuilder';

export const revalidate = 600;

export async function generateStaticParams() {
  const pageData = await client.fetch('*[_type == "page"]{slug}');
  return pageData.map((page: any) => ({ slug: page.slug.current }));
}

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  pageBuilder[]{
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

type PageProps = {
  params: Promise<{ slug: string }>;
};

const Page = async (props: PageProps) => {
  const params = await props.params;
  const pageData = await client.fetch<SanityDocument>(PAGE_QUERY, params);

  if (!pageData) return <div>Cannot find page.</div>;

  return (
    <ContentWrapper className="pt-40 md:pt-72">
      {Array.isArray(pageData.pageBuilder) && (
        <PageBuilder
          blocks={pageData.pageBuilder}
          title={pageData.title}
          context="page"
        />
      )}
    </ContentWrapper>
  );
};

export default Page;
