import DoapXepTable from '@/components/DoapXepTable';

const page = () => {
  return (
    <article className="max-w-3xl mx-auto flex flex-col justify-center min-h-[calc(100dvh-18rem)] my-20">
      <h1 className="text-5xl font-bold mb-4 text-center">Install</h1>
      <div className="prose dark:prose-dark text-justify text-md">
        <table className="w-full border border-gray-300 shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border"></th>
              <th className="px-4 py-2 border">iOS</th>
              <th className="px-4 py-2 border">macOS</th>
              <th className="px-4 py-2 border">macOS (homebrew)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2 border">Stable</td>
              <td className="px-4 py-2 border">
                <a
                  href="https://apps.apple.com/app/id317711500"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 dark:text-blue-400"
                >
                  App Store
                </a>
              </td>
              <td className="px-4 py-2 border">
                <a
                  href="https://apps.apple.com/app/id1637078500"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 dark:text-blue-400"
                >
                  App Store
                </a>
              </td>
              <td className="px-4 py-2 border">brew install --cask monal</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2 border">Beta</td>
              <td className="px-4 py-2 border">
                <a
                  href="https://testflight.apple.com/join/lLLlgHpB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 dark:text-blue-400"
                >
                  Testflight Invitation
                </a>
              </td>
              <td className="px-4 py-2 border">
                <a
                  href="https://testflight.apple.com/join/tGH2m5vf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 dark:text-blue-400"
                >
                  Testflight Invitation
                </a>
              </td>
              <td className="px-4 py-2 border">brew install --cask monal@beta</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2 border">Alpha</td>
              <td className="px-4 py-2 border">
                upon request to{' '}
                <a
                  href="mailto:info@monal-im.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 dark:text-blue-400"
                >
                  info@monal-im.org
                </a>{' '}
                Then download from our
                <a
                  href="https://downloads.monal-im.org/monal-im/alpha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 dark:text-blue-400"
                >
                  alpha download site
                </a>
                <br />
                <br />
                You can get updates about alpha releases by joining this channel:
                <a
                  href="xmpp:monal-alpha@chat.yax.im?join"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 dark:text-blue-400"
                >
                  monal-alpha@chat.yax.im
                </a>
              </td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border">
                brew tap monal-im/homebrew-monal-alpha brew install --cask monal-alpha
                <br />
                <br />
                You can get updates about alpha releases by joining this channel:
                <a
                  href="xmpp:monal-alpha@chat.yax.im?join"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 dark:text-blue-400"
                >
                  monal-alpha@chat.yax.im
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 className="text-4xl font-bold my-4 text-start">Features</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p>Monal currently covers the following chat features:</p>
        <ul className="list-inside list-disc my-4">
          <li>Decentralised and federated chat standard XMPP</li>
          <li>Private and group messaging</li>
          <li>Privacy-respecting push notifications</li>
          <li>Encrypted private and group chats state-of-the-art encryption (OMEMO)</li>
          <li>Message history</li>
          <li>Free selection of your XMPP account provider</li>
          <li>Voice messaging</li>
          <li>Message archiving</li>
          <li>Upload of files, videos and images (HTTP Upload)</li>
          <li>Audio and Video calls</li>
          <li>
            Many settings and a design to offer privacy settings in the app to the need of the user
          </li>
          <li>
            A detailed and technical listing of your supported features (so called XMPP Extensions)
            can be found in our DOAP file.
          </li>
        </ul>
        <h3 className="text-2xl font-bold my-4 text-start">Planned features</h3>
        <ul className="list-inside list-disc my-4">
          <li>User-interface overhaul</li>
        </ul>
        <DoapXepTable />
      </div>
    </article>
  );
};

export default page;
