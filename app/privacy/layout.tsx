import Link from 'next/link';

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  const data = [
    { release: '6.0 and newer', policy: 'Privacy Policy Rev 003', url: 'monal_app_rev_003' },
    { release: '5.2.0 up to 5.4.x', policy: 'Privacy Policy Rev 002', url: 'monal_app_rev_002' },
    { release: 'before 5.2.0', policy: 'Privacy Policy Rev 001', url: 'monal_app_rev_001' },
  ];
  return (
    <article className="max-w-3xl mx-auto flex flex-col justify-center min-h-[calc(100dvh-18rem)] my-20">
      <h1 className="text-5xl font-bold mb-4 text-center">Privacy</h1>
      <h2 className="text-3xl font-bold my-4 text-start">Monal Website</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p>
          You can find our latest privacy policy for our website here: <u>Website Privacy Policy</u>
        </p>
      </div>
      <h2 className="text-3xl font-bold my-4 text-start">Monal App</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p>
          Our privacy policy may differ between app versions. Before reading our privacy policy for
          our App you first need to find out the Monal version that you are using.
        </p>
      </div>
      <h3 className="text-2xl font-bold my-4 text-start">How to find out your Monal version</h3>
      <div className="prose dark:prose-dark text-justify text-lg">
        <blockquote className="border-l-4 border-l-black-500 pl-4 py-2 my-2">
          <ul className="list-inside list-decimal">
            <li>Open Monal</li>
            <li>Open up the settings menu in the upper left corner (gearwheel)</li>
            <li>Scroll down to the last entry “version”</li>
          </ul>
        </blockquote>
      </div>
      <h3 className="text-2xl font-bold my-4 text-start">Monal App Privacy Policies</h3>
      <div className="prose dark:prose-dark text-justify text-lg">
        <table className="border border-gray-300 shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Releases</th>
              <th className="px-4 py-2 border">Privacy Policy</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 border">{row.release}</td>
                <td className="px-4 py-2 border">
                  <Link href={'/privacy/' + row.url} className="underline">
                    {row.policy}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <>{children}</>
    </article>
  );
}
