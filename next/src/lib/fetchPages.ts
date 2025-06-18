import { client } from '@/sanity/client';

export type Page = {
  title: string;
  slug: string;
};

export async function getNavPages(): Promise<Page[]> {
  const query = `
    *[_type == "page" && showInNav == true]{
      title,
      "slug": slug.current
    }
  `;

  const pages = await client.fetch(query);

  return pages;
}
