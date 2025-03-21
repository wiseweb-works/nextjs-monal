const page = () => {
  return (
    <article className="w-full mx-auto flex flex-col justify-center mt-4">
      <h2 className="text-4xl font-bold my-4 text-start">Privacy Monal App 5.2.0 - 5.4.x</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p>
          App Resources are very limited on iOS and macOS. Monal for example can only run a limited
          time in the background after a user either locked the screen or switched the app. Hence,
          apps can not simply keep a connection to your xmpp server open 24/7 to inform you about
          new messages. To overcome these limitations your XMPP-Server can can request our push
          server to send push messages to Apple. With these push messages we can request Apple to
          wake up the app on your phone. Once it is woken up it has about 30 seconds to connect to
          your XMPP server, fetch all new messages and show a push notification for these new
          messages.
        </p>
        <h3 className="text-2xl font-bold my-4 text-start">How push works</h3>
        <p>
          Every time that Monal logins at your XMPP servers, it requests your server to inform us
          once your received an XMPP message while Monal was closed. We therefore requests a Monal
          specific push token from Apple. Using this Monal specific push token our push server can
          send push messages via Apples push system to wake up the app on your device.
        </p>
        <br />
        <p>
          Once push messages are enabled for your Monal instance on your XMPP servers, your XMPP
          servers will open a encrypted server to server (s2s) connection to one of our push
          servers. Using this s2s connection your XMPP servers will then request our push servers to
          wake up Monal every time that new messages should be processed. To wake up your instance
          your XMPP servers send us:
        </p>
        <ul className="list-inside list-disc my-4">
          <li>your unique Monal specific push token that was generated by Apple</li>
          <li>the domain of the XMPP server that you are using.</li>
        </ul>
        <h3 className="text-2xl font-bold my-4 text-start">Push</h3>
        <ul className="list-inside list-disc my-4">
          <li>
            We <b>never</b> see your messages.
          </li>
          <li>
            We <b>do not</b> know who you are chatting with.
          </li>
          <li>
            We could <b>only</b> ever track what XMPP domains a push token is/was using.
          </li>
          <li>
            We <b>can not</b> identify a user.
          </li>
        </ul>
        <h3 className="text-2xl font-bold my-4 text-start">Push-Servers</h3>
        <p>
          We provide two independent push server regions at the moment: Europe and US. By default,
          each device will choose our Europe based push region unless the device local is set to the
          US.
        </p>
        <h3 className="text-2xl font-bold my-4 text-start">How to change the push region</h3>
        <blockquote className="border-l-4 border-l-black-500 pl-4 py-2 my-2">
          <ul className="list-inside list-decimal">
            <li>Open Monal</li>
            <li>Open up the settings menu in the upper left corner (gearwheel)</li>
            <li>Open the Notifications menu</li>
            <li>Scroll down</li>
            <li>Select a region</li>
          </ul>
        </blockquote>
        <h3 className="text-2xl font-bold my-4 text-start">Push server regions</h3>
        <p>
          If you are an XMPP server administrator, and you restricted s2s connections, please allow
          s2s to all our regions.
        </p>
        <table className="w-full border border-gray-300 shadow-md my-4">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Region</th>
              <th className="px-4 py-2 border">Hostname</th>
              <th className="px-4 py-2 border">Notice</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2 border">Europe</td>
              <td className="px-4 py-2 border">eu.prod.push.monal-im.org</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2 border">US</td>
              <td className="px-4 py-2 border">us.prod.push.monal-im.org</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-2xl font-bold my-4 text-start">Crash reports and app usage</h3>
        <p>
          Monal does track crashes and usage data anonymously using the tools provided by Apple.
          This is opt-in only and controlled by iOS and macOS global settings. If a user decides not
          to send any data to developers, no crash logs are sent to Monal developers.
        </p>
        <h3 className="text-2xl font-bold my-4 text-start">Logs</h3>
        <p>
          Your local device will contain a log file with all sent and received raw XMPP messages as
          well as debug logs. It does contain sensitive personal data! This file will never be
          transferred to us, except if you explicitly (manually) send it to us (e.g. via mail).
        </p>
        <h3 className="text-2xl font-bold my-4 text-start">GDPR Subject Access Requests (SAR)</h3>
        <p>
          European GDPR allows users to request a copy of all data retained about them. Starting
          with Monal 5.2.0 we no longer see your JIDs{' '}
          <a
            href="mailto:username@domain.tld"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 dark:text-blue-400"
          >
            (username@domain.tld)
          </a>{' '}
          in our push servers. We therefore are not able to send you retained data related to your
          JID. We furthermore are unable to provide your retained data related to your unique push
          token because we have no way to verify that Apple issued you a provided token. If you have
          questions regarding GDPR, please send us a mail to{' '}
          <a
            href="mailto:info@monal-im.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 dark:text-blue-400"
          >
            info@monal-im.org
          </a>
          .
        </p>
      </div>
    </article>
  );
};

export default page;
