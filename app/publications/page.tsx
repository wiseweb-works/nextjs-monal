const page = () => {
  return (
    <article className="max-w-3xl mx-auto flex flex-col justify-center min-h-[calc(100dvh-18rem)] my-20">
      <h1 className="text-5xl font-bold mb-4 text-center">Publications</h1>
      <h2 className="text-4xl font-bold my-4 text-start">Talks and other documents</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <ul className="list-inside list-disc my-4">
          <li>
            Molitor, Thilo; Altheide, Friedrich. <b>Modern XMPP - A story based on Monal</b>{' '}
            <em>Berlin XMPP Meetup</em>, 13th April 2022, <u>Recording</u>, <u>Slides</u>
          </li>
          <li>
            Molitor, Thilo; Altheide, Friedrich. <b>Privacy friendly push</b>
            <em>Berlin XMPP Meetup</em>, 13th April 2022, <u>Recording</u>, <u>Slides</u> (starting
            after page 29)
          </li>
          <li>
            Molitor, Thilo. <u>XMPP Push notifications on iOS</u>
          </li>
          <li>
            Molitor, Thilo. <b>Monal development recap 2019 - 2021 and open discussion</b>{' '}
            <em>Berlin XMPP Meetup</em>, 13th October 2021, <u>Recording</u>
          </li>
        </ul>
      </div>
      <h2 className="text-4xl font-bold my-4 text-start">XEP publications</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <ul className="list-inside list-disc my-4">
          <li>
            <u>XEP-0353: Jingle Message Initiation</u>
          </li>
          <p>Authors: Philipp Hancke, Peter Saint-Andre, Thilo Molitor</p>
          <blockquote className="border-l-4 border-l-black-500 pl-4 py-2 my-2">
            This specification provides a way for the initiator of a Jingle session to propose
            sending an invitation in an XMPP message stanza, thus taking advantage of message
            delivery semantics instead of sending IQ stanzas to all of the responder’s online
            resources or choosing a particular online resource.
          </blockquote>
          <li>
            <u>XEP-0474: SASL SCRAM Downgrade Protection</u>
          </li>
          <p>Authors: Thilo Molitor</p>
          <blockquote className="border-l-4 border-l-black-500 pl-4 py-2 my-2">
            This specification provides a way to secure the SASL and SASL2 handshakes against method
            and channel-binding downgrades.
          </blockquote>
          <li>
            <u>XEP-0388: Extensible SASL Profile</u>
          </li>
          <p>Authors: Dave Cridland, Thilo Molitor, Matthew Wild</p>
          <blockquote className="border-l-4 border-l-black-500 pl-4 py-2 my-2">
            This document describes a replacement for the SASL profile documented in RFC 6120 which
            allows for greater extensibility.
          </blockquote>
          <li>
            <u>XEP-0480: SASL Upgrade Tasks</u>
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
