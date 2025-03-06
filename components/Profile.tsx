import { faGithub, faMastodon } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHandHoldingDollar, faSquareRss } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

const Profile = () => {
  return (
    <section className="flex flex-col items-center mx-auto justify-center text-center mb-8 min-h-full h-[80dvh] max-w-3xl">
      <Image
        src="/logo.png"
        width={120}
        height={120}
        alt="Monal App Icon"
        title="Monal App Icon"
        className="w-32 h-32 rounded-full mt-4"
        draggable={false}
      />
      <h1 className="text-3xl font-bold mt-4">Monal IM</h1>
      <span className="text-gray-600 dark:text-gray-300">iOS and macOS XMPP Chat-Client</span>

      <div className="flex gap-4 mt-4">
        <a
          href="https://github.com/monal-im/monal"
          target="_blank"
          rel="noopener noreferrer"
          title="Github"
          className="hover:text-blue-500"
        >
          <FontAwesomeIcon icon={faGithub} width={32} />
        </a>
        <a
          href="https://github.com/monal-im/monal"
          target="_blank"
          rel="noopener noreferrer"
          title="Github"
          className="hover:text-blue-500"
        >
          <FontAwesomeIcon icon={faEnvelope} width={32} />
        </a>
        <a
          href="https://github.com/monal-im/monal"
          target="_blank"
          rel="noopener noreferrer"
          title="Github"
          className="hover:text-blue-500"
        >
          <FontAwesomeIcon icon={faHandHoldingDollar} width={32} />
        </a>
        <a
          href="https://github.com/monal-im/monal"
          target="_blank"
          rel="noopener noreferrer"
          title="Github"
          className="hover:text-blue-500"
        >
          <FontAwesomeIcon icon={faMastodon} width={32} />
        </a>
        <a
          href="https://github.com/monal-im/monal"
          target="_blank"
          rel="noopener noreferrer"
          title="Github"
          className="hover:text-blue-500"
        >
          <FontAwesomeIcon icon={faSquareRss} width={32} />
        </a>
      </div>

      <div className="flex space-x-4 mt-6">
        <a
          href="https://apps.apple.com/app/id317711500"
          rel="noopener noreferrer"
          title="Get Monal iOS"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          Get Monal iOS
        </a>
        <a
          href="https://apps.apple.com/app/id1637078500"
          rel="noopener noreferrer"
          title="Get Monal macOS"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
        >
          Get Monal macOS
        </a>
      </div>
    </section>
  );
};

export default Profile;
