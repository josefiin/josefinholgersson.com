import FooterLink from '../components/FooterLink';

type FooterProps = {};

const Footer = (props: FooterProps) => {
  return (
    <footer className="bg-decoration px-4 md:px-10 py-20 lg:py-32 lg:flex justify-between items-center">
      <p className="text-5xl md:text-8xl tracking-tight mb-6 lg:mb-0">
        Let’s talk!
      </p>
      <section className="flex flex-col mb-16 lg:mb-0">
        <a
          href="mailto:holgersson.josefin@gmail.com"
          className="link-sm lg:mb-2"
        >
          holgersson.josefin@gmail.com
        </a>
        <a href="tel:+46721648460" className="link-sm">
          +46 721 64 84 60
        </a>
      </section>
      <section>
        <FooterLink text="Github" href="https://github.com/josefiin" />
        <FooterLink
          text="LinkedIn"
          href="https://www.linkedin.com/in/josefin-holgersson-20438731/"
        />
      </section>
    </footer>
  );
};

export default Footer;
