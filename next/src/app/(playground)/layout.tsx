import Navigation from '@/compositions/Navigation';
import { getNavPages } from '@/lib/fetchPages';

// Lekytan behöver hela viewporten: ingen footer och inga marginaler på main.
// Navigationen ligger kvar så att det alltid går att ta sig tillbaka till sajten.
const PlaygroundLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pages = await getNavPages();

  return (
    <>
      <Navigation pages={pages} />
      <main className="flex-grow">{children}</main>
    </>
  );
};

export default PlaygroundLayout;
