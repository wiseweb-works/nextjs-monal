const page = () => {
  return (
    <article className="w-full mx-auto flex flex-col justify-center mt-4">
      <h2 className="text-4xl font-bold my-4 text-start">Privacy Monal App {'<'} 5.2.0</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p>
          Monal for iOS and macOS will register for APNS push notifications via a server to server
          (s2s) connection from your XMPP server to our push server. Your XMPP JID alongside with a
          push identifier and secret token from Apple, that is only valid for this app, will be
          saved and logged in the push-server logs. We do not intend to track you. All server logs
          are purged every two weeks. Our logs allow us to see the following details:
        </p>
        <ul className="list-inside list-disc my-4">
          <li>Your JID (including your server’s hostname)</li>
          <li>Time when you register for push notifications</li>
          <li>Your apple push node and push token that was generated for Monal by Apple</li>
          <li>Time when your XMPP server triggered a push notification to your Monal device</li>
        </ul>
        <p>
          To fulfill its duty, our push server has to hold some information associated with an Apple
          push token, until Apple marks the token a deleted, which usually means you have
          uninstalled the app (Info: Apple confirms if a token is still valid on every push). In
          detail these information consists of:
        </p>
        <ul className="list-inside list-disc my-4">
          <li>The Apple push token</li>
          <li>The timestamp of the last push error</li>
          <li>The timestamp of the last successful push</li>
          <li>The timestamp of the registration of your device with Monal’s push-server</li>
          <li>The timestamp when the registration was renewed</li>
          <li>A random UUID identifying your device</li>
          <li>A random secret used by your XMPP server to authenticate a push</li>
        </ul>
        <h3 className="text-2xl font-bold my-4 text-start">Push server locations</h3>
        <table className="w-full border border-gray-300 shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Hoster</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Notice</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2 border">ios13push.monal.im</td>
              <td className="px-4 py-2 border">AWS</td>
              <td className="px-4 py-2 border">US</td>
              <td className="px-4 py-2 border">
                Provided by Anurodh Pokharel
                <br />
                IPv4 only
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2 border">push.monal.im</td>
              <td className="px-4 py-2 border">AWS</td>
              <td className="px-4 py-2 border">US</td>
              <td className="px-4 py-2 border">
                Provided by Anurodh Pokharel
                <br />
                IPv4 only
                <br />
                iOS 12 only
              </td>
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
          European GDPR allows users to request a copy of all data retained about them. Please send
          GDPR requests to{' '}
          <a
            href="mailto:info@monal-im.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 dark:text-blue-400"
          >
            info@monal-im.org
          </a>
          . As by GDPR we need to validate your JID before answering to your inquiry. Therefore, we
          will provide you a JID you must send a confirmation to, before we can answer your request
          and send you all retained data related to your JID.
        </p>
      </div>
    </article>
  );
};

export default page;
