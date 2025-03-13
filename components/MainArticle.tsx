import Image from 'next/image';

const MainArticle = () => {
  return (
    <article className="max-w-3xl mx-auto mb-20">
      <h1 className="text-5xl font-bold mb-4 text-center">Monal-IM. Privacy like it&apos;s 1999</h1>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p>
          Monal is an XMPP instant messaging client for macOS and iOS which strives to be the go-to
          client for these platforms just like the app Conversations IM is for Android. XMPP in
          general is an open and standardized protocol for real time communication. Anyone can host
          their own server and communicate freely with each other, just like with email and just
          like email the used addresses are of the form{' '}
          <a
            href="mailto:username@domain.tld"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 dark:text-blue-400"
          >
            “user@domain.tld”.
          </a>
          The user can use different apps and services, such as Monal, from a single but also
          multiple accounts. This serves a decentral and sovereign infrastructure and digital
          communication on the internet but also offers many potential for innovation. The chat
          client for iOS and macOS involves implementing various XEP standards (XMPP extension
          protocols, adding modern functionality to the XMPP-core and XMPP-im RFCs, see{' '}
          <a
            href="https://xmpp.org/extensions/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 dark:text-blue-400"
          >
            XMPP Extensions
          </a>
          ).
        </p>
        <div className="flex space-x-4 mt-4">
          <div className="w-1/3">
            <Image
              src="/images/image1.png"
              alt="Image 1"
              sizes="100vw"
              style={{
                maxWidth: '300px',
                width: '100%',
                height: 'auto',
              }}
              width={500}
              height={300}
            />
          </div>
          <div className="w-1/3">
            <Image
              src="/images/image2.png"
              alt="Image 2"
              sizes="100vw"
              style={{
                maxWidth: '300px',
                width: '100%',
                height: 'auto',
              }}
              width={500}
              height={300}
            />
          </div>
          <div className="w-1/3">
            <Image
              src="/images/image3.png"
              alt="Image 3"
              sizes="100vw"
              style={{
                maxWidth: '300px',
                width: '100%',
                height: 'auto',
              }}
              width={500}
              height={300}
            />
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold m-4 text-center">Designed for iOS and Mac</h1>
      <div className="prose dark:prose-dark text-justify text-lg my-4">
        <p>
          Things look and work the way you expect. iOS, iPadOS or macOS, there is a version of Monal
          for you.
        </p>
        <div className="flex space-x-4 mt-4">
          <div className="w-2/5">
            <Image
              src="/images/iphone1.png"
              alt="Image 1"
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={500}
              height={300}
            />
          </div>
          <div className="w-3/5">
            <Image
              src="/images/ipad1.png"
              alt="Image 2"
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={500}
              height={300}
            />
          </div>
        </div>
      </div>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p className="my-4">
          Monal is developed under an open-source BSD license that serves the user, while not
          selling or tracking information for external parties (nor for anyone else). This app
          exists because it is key to ensure usability on all platforms and within the XMPP network
          with all its positives aspects when it comes to decentral communication and
          infrastructure.
        </p>
        <p className="text-start">
          <a
            href="https://github.com/monal-im/Monal"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 dark:text-blue-400"
          >
            Find the development on GitHub!
          </a>
        </p>
      </div>
    </article>
  );
};

export default MainArticle;
