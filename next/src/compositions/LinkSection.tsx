import Button from '@/components/Button';
import classNames from 'classnames';

type LinkSectionProps = {
  className?: string;
};

const LinkSection = (props: LinkSectionProps) => {
  const classe = classNames(
    'md:flex gap-4 mb-sm [&>*:not(:last-child)]:mb-4 [&>*:not(:last-child)]:md:mb-0',
    props.className,
  );

  return (
    <div>
      <Button text="" href="" />
    </div>
  );
};

export default LinkSection;

//   <div className="md:flex gap-4 mb-sm [&>*:not(:last-child)]:mb-4 [&>*:not(:last-child)]:md:mb-0">
//     {/* Varje knapp utom den sista mb-4 i mobil. */}
//     {Array.isArray(caseData.links) &&
//       caseData.links.map((item) => (
//         <ButtonSm
//           key={item._key}
//           text={item.text}
//           href={item.href}
//           className="w-full md:w-auto"
//         />
//       ))}
//   </div>
