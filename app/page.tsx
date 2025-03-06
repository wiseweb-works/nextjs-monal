import MainArticle from '@/components/MainArticle';
import Profile from '@/components/Profile';

export default function Home() {
  return (
    <>
      <main className="container mx-auto p-4">
        <Profile />
        <MainArticle />
      </main>
    </>
  );
}
