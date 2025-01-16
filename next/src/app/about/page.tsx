import Button from '@/components/Button';
import ContentWrapper from '@/components/ContentWrapper';
import ExternalLink from '@/components/ExternalLink';
import SubheadingBlock from '@/components/SubheadingBlock';
import TextBlock from '@/compositions/TextBlock';

type AboutProps = {};

const About = (props: AboutProps) => {
  return (
    <ContentWrapper>
      <TextBlock heading="Design, branding and digital experiences.">
        <p className="mb-xs">
          I’m Josefin – a Designer based in Jönköping, experienced within the
          areas of graphic design, branding and digital design. I recently
          completed studies in Front-end development to expand my skill set. I’m
          forward, curious and committed and my approach is conceptual and
          collaborative, aiming to communicate clearly through well-crafted
          design.
        </p>

        <ExternalLink
          className="block w-fit"
          target="_self"
          href="mailto:holgersson.josefin@gmail.com"
        >
          holgersson.josefin@gmail.com
        </ExternalLink>
        <ExternalLink
          className="block w-fit"
          target="_self"
          href="tel:+46721648460"
        >
          +46 721 64 84 60
        </ExternalLink>
      </TextBlock>
      <section className="mb-sm">
        <SubheadingBlock heading="Skill">
          <p>
            Digtal design, UX-design, Branding, Graphic design, Font-end
            development – HTML, CSS, Javascript
          </p>
        </SubheadingBlock>
        <SubheadingBlock heading="Tech">
          <p>Tailwind, React, Github</p>
        </SubheadingBlock>
        <SubheadingBlock heading="Experience 2012 – 2023">
          <p>
            Designer at {''}
            <ExternalLink href="https://www.grandpublic.se/">
              Grand Public
            </ExternalLink>
            , Jönköping
          </p>
          <p>
            Designer at {''}
            <ExternalLink href="https://nexergroup.com/sv/maverick/">
              Maverick by Nexer
            </ExternalLink>
            , Göteborg
          </p>
          <p>
            Designer at {''}
            <ExternalLink href="https://www.stendahls.se/">
              Stendahls
            </ExternalLink>
            , Göteborg
          </p>
          <p>Designer at Brand Club, Göteborg</p>
          <p>Assisting Art director at Stendahls, Göteborg</p>
          <p>Final art at Dragster, Göteborg</p>
        </SubheadingBlock>
        <SubheadingBlock heading="Education">
          <p>Webbdesigner</p>
          <p>Högskolan Väst</p>
          <p className="mb-6">January 2024 – January 2025</p>
          <p>Front-end development</p>
          <p>Brobygrafiska</p>
          <p className="mb-6">August 2023 – January 2024</p>
          <p>UX/UI designer</p>
          <p>Brobygrafiska</p>
          <p className="mb-6">January 2021 – June 2021</p>
          <p>Bachelor of Communication Design</p>
          <p>Swinburne University of Technology</p>
          <p>Melbourne, Australia</p>
          <p className="mb-6">August 2010 – June 2011</p>
          <p>Graphic Design</p>
          <p>Høyskolen Kristiania Oslo, Norway</p>
          <p>August 2007 – June 2009</p>
        </SubheadingBlock>
      </section>
      <Button
        className="mt-sm"
        text="Github"
        href="https://github.com/josefiin"
      />
    </ContentWrapper>
  );
};

export default About;
