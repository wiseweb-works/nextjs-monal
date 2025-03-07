const page = () => {
  return (
    <article className="max-w-3xl mx-auto flex flex-col justify-center min-h-[calc(100dvh-18rem)] my-20">
      <h1 className="text-5xl font-bold mb-4 text-center">About</h1>
      <h2 className="text-4xl font-bold my-4 text-start">Imprint</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p>Thilo Molitor</p>
        <p>Vogelsbergstr. 18</p>
        <p>68642 Bürstadt</p>
        <p>Germany</p>
        <p>
          <br />
          eMail: info[at]monal[minus]im[dot]org
        </p>
      </div>
      <h2 className="text-4xl font-bold my-4 text-start">About</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p>
          Monal originates in 2002 as fork of the SworIM app. Until 2019 it has been developed by
          Anu Pokharel. Since then Thilo Molitor took over the development and joined in 2020 with
          Friedrich Altheide (until 2024). From initial rewrite of code in the backend the entire
          app has been upgraded with a modern XMPP engine, new features and future-proof setup.
          Monal challenges to be the go-to XMPP chat-app for the iOS and macOS platform.
        </p>
      </div>
      <h2 className="text-4xl font-bold my-4 text-start">Monal Team</h2>
      <div className="prose dark:prose-dark text-justify text-lg">
        <p>
          <b>Thilo Molitor</b> - <u>About me on wiki.xmpp.org</u>
        </p>
      </div>
    </article>
  );
};

export default page;
