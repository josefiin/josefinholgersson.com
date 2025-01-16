import NavLink from './NavLink';

type NavigationProps = {};

const Navigation = (props: NavigationProps) => {
  return (
    <header className="grid grid-cols-2 md:grid-cols-8 gap-4 md:gap-6 px-4 md:px-10 pt-6 md:pt-10 mb-lg">
      <NavLink href="/" text="Josefin Holgersson" className="md:col-span-2" />
      <p className="hidden md:block md:col-start-3 md:col-span-2">
        Based in Jönköping
      </p>
      <ul className="col-span-1 md:col-span-2 md:col-start-7 md:col-end-9 flex justify-end gap-4 md:gap-6">
        <li>
          <NavLink href="/#case-section" text="Work" />
        </li>
        <li>
          <NavLink href="/about" text="About" />
        </li>
      </ul>
    </header>
  );
};

export default Navigation;
