import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard'); // Use replace to avoid adding to history stack
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-center">Pls wait we are redirecting you back 😊</h1>
    </div>
  );
}
