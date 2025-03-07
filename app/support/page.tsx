import Image from 'next/image';

const page = () => {
  return (
    <article className="max-w-3xl mx-auto flex flex-col justify-center min-h-[calc(100dvh-18rem)] my-20">
      <h1 className="text-5xl font-bold mb-4 text-center">Support</h1>
      <div className="prose dark:prose-dark text-justify text-lg">
        <ul className="list-inside list-disc my-4">
          <li>
            Monal Support Channel (XMPP MUC): <u>monal@chat.yax.im</u>
          </li>
          <li>
            Github Tickets: <u>https://github.com/monal-im/Monal/issues</u>
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
            Donate via <u>Github Sponsors</u>
          </li>
          <li>
            Donate via <u>Libera Pay</u>
          </li>
          <li>EU citizens can donate via SEPA, too. IBAN: [REDACTED]</li>
        </ul>
        <p>
          Here you can read about <u>further support of development!</u>
        </p>
        <p className="my-4">
          Find general information in the <u>Monal Wiki.</u>
        </p>
      </div>
      <h2 className="text-4xl font-bold my-4 text-start">Translations</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p> Appstore metadata can be translated:</p>
        <ul className="list-inside list-disc my-4">
          <li>
            <u>Instructions for Monal</u>
          </li>
          <li>
            <u>Instructions for Quicksy.</u>
          </li>
        </ul>
        <p>
          Translations of the app itself are hosted and managed via <u>Weblate</u>. Feel free to
          translate Monal to your language!
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
          It is highly appreciated reporting a vulnerability to the Monal developers. We ask you for
          disclosure until it has been fixed. This prevents abuse and exploitation in the current
          published releases. Please report issues directly to info[at]monal[minus]im[dot]org.
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
