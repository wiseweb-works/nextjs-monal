import Link from 'next/link';

const page = () => {
  return (
    <main className="h-[calc(100dvh-8rem)] w-full flex flex-col justify-center items-center ">
      <h1 className="text-9xl font-extrabold text-[#FF6A3D] tracking-widest">503</h1>
      <div className="bg-[#1A2238] text-white p-2 text-sm rounded absolute">Work In Progress</div>
      <div className="mt-5">
        <Link
          href="/"
          className="relative inline-block text-sm font-medium text-white group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            Go Home
          </span>
        </Link>
      </div>
    </main>
  );
};

export default page;
