import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 p-4 mt-auto">
      <div className="container mx-auto text-center text-sm text-gray-600 dark:text-white">
        <span>
          &copy; 2025{' '}
          <Link href="/" className="hover:text-blue-500">
            Monal
          </Link>
        </span>
        <span className="mx-2">·</span>
        <span>
          Powered by{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <u>Nextjs</u>
          </a>{' '}
          &{' '}
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <u>React</u>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
