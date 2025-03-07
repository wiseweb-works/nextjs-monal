'use client';

import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';

import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: 'Install', href: '/install' },
    { name: 'Support', href: '/support' },
    { name: 'Blog', href: '/blog' },
    { name: 'Publications', href: '/publications' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'About', href: '/about' },
    { name: 'Wiki', href: 'https://github.com/monal-im/Monal/wiki' },
    { name: 'Search', href: '/search' },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <nav className="container relative mx-auto flex items-center justify-between p-4 max-w-5xl">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 dark:text-white"
            accessKey="h"
            title="Monal (Alt + H)"
          >
            Monal
          </Link>
          <ThemeToggle />
        </div>
        <button className="md:hidden p-2" onClick={toggleMenu}>
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            height={24}
            width={24}
            className="text-gray-800 dark:text-white"
          />
        </button>
        <ul className="hidden md:flex items-center space-x-6">
          {navigation.map((item, index) => (
            <li key={index}>
              {item.href.startsWith('https') ? (
                <a
                  href={item.href}
                  title={item.name}
                  className="hover:text-blue-500 dark:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  href={item.href}
                  title={item.name}
                  className="hover:text-blue-500 dark:text-white"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {isMenuOpen && (
          <ul className="absolute left-0 top-full w-full bg-white dark:bg-gray-800 shadow-md md:hidden flex flex-col space-y-4 p-4">
            {navigation.map((item, index) => (
              <li key={index} onClick={() => setIsMenuOpen(false)}>
                {item.href.startsWith('https') ? (
                  <a
                    href={item.href}
                    title={item.name}
                    className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    title={item.name}
                    className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
