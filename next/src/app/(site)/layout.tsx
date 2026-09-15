import Navigation from '@/compositions/Navigation';
import Footer from '@/compositions/Footer';
import { getNavPages } from '@/lib/fetchPages';

// Standardramen för sajten: navigation, innehållsyta med marginaler och footer.
const SiteLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pages = await getNavPages();

  return (
    <>
      <Navigation pages={pages} />
      <main className="px-4 md:px-10 mb-32 flex-grow">{children}</main>
      <Footer />
    </>
  );
};

export default SiteLayout;
