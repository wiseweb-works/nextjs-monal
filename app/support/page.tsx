import Image from 'next/image';

const page = () => {
  return (
    <article className="max-w-3xl mx-auto flex flex-col justify-center min-h-[calc(100dvh-18rem)] my-20">
      <h1 className="text-5xl font-bold mb-4 text-center">Support</h1>
      <div className="prose dark:prose-dark text-justify text-lg">
        <ul className="list-inside list-disc my-4">
          <li>
            Monal Support Channel (XMPP MUC):{' '}
            <a
              href="xmpp:monal@chat.yax.im"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              monal@chat.yax.im
            </a>
          </li>
          <li>
            Github Tickets:{' '}
            <a
              href="https://github.com/monal-im/Monal/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              https://github.com/monal-im/Monal/issues
            </a>
          </li>
          <li>Email: info[at]monal[minus]im[dot]org.</li>
        </ul>
      </div>
      <h2 className="text-4xl font-bold my-4 text-start">Donate</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p>
          Monal is developed by volunteers and community collaboration. The work which has been done
          is usually not paid, and the developers ask for donations to keep up service costs and
          development in the future! Please consider giving a little back for the hard work which
          has been conducted. Currently, there are three ways for financial support of the Monal
          development:
        </p>
        <ul className="list-inside list-disc my-4">
          <li>
            Donate via{' '}
            <a
              href="https://github.com/sponsors/tmolitor-stud-tu"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              Github Sponsors
            </a>
          </li>
          <li>
            Donate via{' '}
            <a
              href="https://liberapay.com/tmolitor"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              Libera Pay
            </a>
          </li>
          <li>EU citizens can donate via SEPA, too. IBAN: [REDACTED]</li>
        </ul>
        <p>
          Here you can read about{' '}
          <a
            href="https://github.com/monal-im/Monal/issues/363"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 dark:text-blue-400"
          >
            further support of development!
          </a>
        </p>
        <p className="my-4">
          Find general information in the{' '}
          <a
            href="https://github.com/monal-im/Monal/wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 dark:text-blue-400"
          >
            Monal Wiki.
          </a>
        </p>
      </div>
      <h2 className="text-4xl font-bold my-4 text-start">Translations</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p> Appstore metadata can be translated:</p>
        <ul className="list-inside list-disc my-4">
          <li>
            <a
              href="https://github.com/monal-im/Monal/tree/develop/appstore_metadata"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              Instructions for Monal
            </a>
          </li>
          <li>
            <a
              href="https://github.com/monal-im/Monal/tree/develop/appstore_quicksy_metadata"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              Instructions for Quicksy.
            </a>
          </li>
        </ul>
        <p>
          Translations of the app itself are hosted and managed via{' '}
          <a
            href="https://hosted.weblate.org/engage/monal/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 dark:text-blue-400"
          >
            Weblate
          </a>
          . Feel free to translate Monal to your language!
        </p>
        <Image
          src="https://hosted.weblate.org/widget/monal/multi-auto.svg"
          alt="Translation status"
          width={450}
          height={300}
          className="mx-auto py-4"
        />
      </div>
      <h2 className="text-4xl font-bold my-4 text-start">Reporting a Vulnerability</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p>
          It is highly appreciated reporting a vulnerability to the Monal developers. We ask you to
          not disclose it to the public until the vulnerability has been fixed. This prevents abuse
          and exploitation in the current published releases. Please report issues directly to
          info[at]monal[minus]im[dot]org.
        </p>
        <p>Please try to report</p>
        <ul className="list-inside list-disc my-4">
          <li>in detail what you are concerned about</li>
          <li> if applicable, how to reproduce</li>
          <li>
            your contact details, if the sending email is not enough. That way we can ask questions
            back to you.
          </li>
        </ul>
        <p>
          You are also invited to make a recommendation on how to fix a potential security
          vulnerability.
        </p>
        <p className="my-4">
          Once a vulnerability has been announced and indicated we try our very best to provide a
          fix as soon as possible, at its best within days. However, dependent on the potential
          issue it can take longer if many code sections need to be changed.
        </p>
        <p>Please be reminded that this is a non-commercial software project.</p>
        <p className="my-4">
          Thank you for considering reporting a security vulnerability. This improves the quality of
          the app significantly.
        </p>
      </div>
    </article>
  );
};

export default page;
