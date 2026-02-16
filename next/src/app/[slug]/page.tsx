import type { SanityDocument } from 'next-sanity';
import { client } from '@/sanity/client';
import TextBlock from '@/compositions/TextBlock';
import SubheadingBlock from '@/compositions/InfoSection';
import Button from '@/components/Button';
import ContentWrapper from '@/components/ContentWrapper';

export const revalidate = 600;

export async function generateStaticParams() {
  const pageData = await client.fetch('*[_type == "page"]{slug}');

  return pageData.map((page: any) => ({ slug: page.slug.current }));
}

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  heading,
  pageBuilder[]{
    ...,
    _type == "textBlock" => {
      _type,
      heading,
      content
    },

    // InfoSection (SubheadingBlock)
    _type == "infoSection" => {
      _type,
      heading,
      body
    },

    // LinkSection (Button)
    _type == "linkSection" => {
      _type,
      links
    }
  }
}
`;

type PageProps = {
  params: Promise<{ slug: string }>;
};
const Page = async (props: PageProps) => {
  const params = await props.params;
  const pageData = await client.fetch<SanityDocument>(PAGE_QUERY, params);

  if (!pageData) {
    return <div>Cannot find page.</div>;
  }

  return (
    <ContentWrapper className="pt-40 md:pt-72">
      {/* <h1>{pageData.title}</h1> */}

      {pageData.pageBuilder?.map((block: any, index: number) => {
        switch (block._type) {
          case 'textBlock':
            return (
              <TextBlock
                key={index}
                heading={block.heading}
                body={block.content}
              />
            );
          case 'infoSection':
            return (
              <SubheadingBlock
                key={index}
                heading={block.heading}
                body={block.content}
              />
            );
          case 'linkSection':
            return (
              <div key={index} className="mt-20">
                {block.links.map((link: any) => (
                  <Button
                    key={link._key}
                    text={link.text}
                    href={link.href}
                    target={link.target}
                  />
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </ContentWrapper>
  );
};

export default Page;
