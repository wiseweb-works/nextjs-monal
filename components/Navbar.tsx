import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const navigation = [
  { name: 'Install', href: '/install' },
  { name: 'Support', href: '/support' },
  { name: 'Blog', href: '/blog' },
  { name: 'Publications', href: '/publications' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'About', href: '/about' },
  { name: 'Wiki', href: '/wiki' },
  { name: 'Search', href: '/search' },
];

const Navbar = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <nav className="container mx-auto flex items-center justify-between p-4 max-w-5xl">
        {/* Logo ve Tema Düğmesi */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 dark:text-white"
            accessKey="h"
            title="Monal (Alt + H)"
          >
            Monal
          </Link>
          <a href="">|</a>
          <button
            id="theme-toggle"
            accessKey="t"
            title="(Alt + T)"
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faMoon} height={24} width={24} color="blue" />
          </button>
          <a href="">|</a>
          <button
            id="theme-toggle"
            accessKey="t"
            title="(Alt + T)"
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faSun} height={24} width={24} color="red" />
          </button>
        </div>

        {/* Navigasyon Menüsü */}
        <ul className="flex items-center space-x-6">
          {navigation.map((item, index) => (
            <li key={index}>
              <Link href={item.href} title={item.name} className="hover:text-blue-500">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
