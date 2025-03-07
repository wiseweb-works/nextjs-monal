import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      accessKey="t"
      title="(Alt + T)"
      className="rounded-full px-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-2xl"
    >
      {theme === 'light' ? (
        <FontAwesomeIcon icon={faMoon} height={24} className="text-blue-500" />
      ) : (
        <FontAwesomeIcon icon={faSun} height={24} className="text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
