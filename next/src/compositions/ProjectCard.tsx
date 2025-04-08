import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import ProjectTag from '@/components/ProjectTag';

type ProjectCardProps = {
  title: string;
  className?: string;
  slug: string;
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  tags: string[];
};

const ProjectCard = (props: ProjectCardProps) => {
  const classes = classNames('mb-8 md:mb-0', props.className);

  return (
    <div className={classes}>
      <Link href={`/${props.slug}`}>
        <div className="overflow-hidden relative mb-2 md:mb-4">
          <Image
            src={props.image.url}
            alt={props.image.alt}
            // Använder bredd och höjd från den uppladdade bilden i sanity
            width={props.image.width}
            height={props.image.height}
            quality={100}
            className="w-full hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 flex flex-wrap gap-2">
            {props.tags.map((tag, index) => (
              <ProjectTag key={index} label={tag} />
            ))}
          </div>
        </div>
        <h2 className="heading-md">{props.title}</h2>
      </Link>
    </div>
  );
};

export default ProjectCard;
