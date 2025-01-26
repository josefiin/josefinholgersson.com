'use client';

import { useEffect, useRef, useState } from 'react';
import NavLink from './NavLink';

type NavigationProps = {};

const Navigation = (props: NavigationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollPos = useRef({ value: 0 });

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollPos = window.scrollY;
      if (
        currentScrollPos > 200 &&
        currentScrollPos > prevScrollPos.current.value
      ) {
        // if scroll down hide the navbar
        setIsVisible(false);
      } else {
        // if scroll up show the navbar
        setIsVisible(true);
      }

      prevScrollPos.current.value = currentScrollPos;
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [prevScrollPos]);

  return (
    <nav
      className={`max-h-28 fixed top-0 left-0 right-0 w-full px-4 md:px-10 py-5 md:py-8 grid grid-cols-2 md:grid-cols-8 gap-4 md:gap-6 bg-[var(--background)] transition-transform duration-300 z-10 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
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
    </nav>
  );
};

export default Navigation;

// grid grid-cols-2 md:grid-cols-8 gap-4 md:gap-6 px-4 md:px-10 fixed top-0 bg-white transition-transform duration-300 pt-6 md:pt-10 mb-lg
