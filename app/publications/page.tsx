const page = () => {
  return (
    <article className="max-w-3xl mx-auto flex flex-col justify-center min-h-[calc(100dvh-18rem)] my-20">
      <h1 className="text-5xl font-bold mb-4 text-center">Publications</h1>
      <h2 className="text-4xl font-bold my-4 text-start">Talks and other documents</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <ul className="list-inside list-disc my-4">
          <li>
            Molitor, Thilo; Altheide, Friedrich. <b>Modern XMPP - A story based on Monal</b>{' '}
            <em>Berlin XMPP Meetup</em>, 13th April 2022,{' '}
            <a
              href="https://xmpp-meetup.in-berlin.de/talks/monal-2022.mp4"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              Recording
            </a>
            ,{' '}
            <a
              href="https://xmpp-meetup.in-berlin.de/talks/monal-and-push.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              Slides
            </a>
          </li>
          <li>
            Molitor, Thilo; Altheide, Friedrich. <b>Privacy friendly push</b>
            <em>Berlin XMPP Meetup</em>, 13th April 2022,{' '}
            <a
              href="https://xmpp-meetup.in-berlin.de/talks/privacy-friendly-push.mp4"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              Recording
            </a>
            ,{' '}
            <a
              href="https://xmpp-meetup.in-berlin.de/talks/monal-and-push.pdf#Navigation31"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              Slides
            </a>{' '}
            (starting after page 29)
          </li>
          <li>
            Molitor, Thilo.{' '}
            <a
              href="https://wiki.xmpp.org/web/Push_notifications#Push_notifications_on_iOS"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              XMPP Push notifications on iOS
            </a>
          </li>
          <li>
            Molitor, Thilo. <b>Monal development recap 2019 - 2021 and open discussion</b>{' '}
            <em>Berlin XMPP Meetup</em>, 13th October 2021,{' '}
            <a
              href="https://xmpp-meetup.in-berlin.de/talks/monal-2021.mp4"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              Recording
            </a>
          </li>
        </ul>
      </div>
      <h2 className="text-4xl font-bold my-4 text-start">XEP publications</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <ul className="list-inside list-disc my-4">
          <li>
            <a
              href="https://xmpp.org/extensions/xep-0353.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              XEP-0353: Jingle Message Initiation
            </a>
          </li>
          <p>Authors: Philipp Hancke, Peter Saint-Andre, Thilo Molitor</p>
          <blockquote className="border-l-4 border-l-black-500 pl-4 py-2 my-2">
            This specification provides a way for the initiator of a Jingle session to propose
            sending an invitation in an XMPP message stanza, thus taking advantage of message
            delivery semantics instead of sending IQ stanzas to all of the responder’s online
            resources or choosing a particular online resource.
          </blockquote>
          <li>
            <a
              href="https://xmpp.org/extensions/xep-0474.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              XEP-0474: SASL SCRAM Downgrade Protection
            </a>
          </li>
          <p>Authors: Thilo Molitor</p>
          <blockquote className="border-l-4 border-l-black-500 pl-4 py-2 my-2">
            This specification provides a way to secure the SASL and SASL2 handshakes against method
            and channel-binding downgrades.
          </blockquote>
          <li>
            <a
              href="https://xmpp.org/extensions/xep-0388.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              XEP-0388: Extensible SASL Profile
            </a>
          </li>
          <p>Authors: Dave Cridland, Thilo Molitor, Matthew Wild</p>
          <blockquote className="border-l-4 border-l-black-500 pl-4 py-2 my-2">
            This document describes a replacement for the SASL profile documented in RFC 6120 which
            allows for greater extensibility.
          </blockquote>
          <li>
            <a
              href="https://xmpp.org/extensions/xep-0480.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              XEP-0480: SASL Upgrade Tasks
            </a>
          </li>
          <p>Authors: Thilo Molitor</p>
          <blockquote className="border-l-4 border-l-black-500 pl-4 py-2 my-2">
            This specification provides a way to upgrade to newer SASL mechanisms using SASL2 tasks.
          </blockquote>
        </ul>
      </div>
    </article>
  );
};

export default page;
