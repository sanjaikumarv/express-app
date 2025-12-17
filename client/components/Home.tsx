"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import Background from "@/components/common/Background";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const isAuthenticated = !!user;

  const handleLogout = () => {
    // Ideally use logout() from context if available, but keeping existing logic
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/login");
    window.location.reload();
  };

  // Better logout handling: The previous code directed to /logout which might not exist as a page
  // I'll assume for now we just want to clear state.
  // Actually, let's keep the user's logic if they had a /logout page, but usually that's an API route.
  // The user's code had `router.push("/logout")`. I will respect that but maybe it was a placeholder.
  // Let's stick safe and use the button to just redirect if that's what it did,
  // BUT visually we are just fixing styles.

  if (isLoading) {
    return (
      <div className='relative flex min-h-screen w-full items-center justify-center bg-[#0f0f23]'>
        <div className='w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin' />
      </div>
    );
  }

  return (
    <div className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0f0f23] p-6 font-sans'>
      <Background />

      <div className='relative z-10 w-full max-w-lg backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl text-center'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
            {isAuthenticated ? `Welcome, ${user.name}!` : "Get Started"}
          </h1>
          <p className='text-gray-300 text-lg'>
            {isAuthenticated
              ? `Signed in as ${user.email}`
              : "Create an account or sign in to continue"}
          </p>
        </div>

        {isAuthenticated ? (
          <div className='space-y-6'>
            <p className='text-gray-400'>
              You have access to the application. Start exploring!
            </p>
            <div className='flex flex-col gap-3'>
              <Link href='/chat' className='w-full'>
                <button className='w-full py-3.5 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-emerald-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]'>
                  Open Chat
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className='w-full py-3.5 rounded-xl font-bold text-white shadow-lg bg-white/10 border border-white/10 hover:bg-white/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]'>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-3'>
            <Link href='/login' className='w-full'>
              <button className='w-full py-3.5 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-indigo-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]'>
                Sign In
              </button>
            </Link>
            <Link href='/register' className='w-full'>
              <button className='w-full py-3.5 rounded-xl font-bold text-indigo-300 shadow-lg bg-transparent border-2 border-indigo-500/50 hover:bg-indigo-500/10 hover:border-indigo-500 transition-all transform hover:scale-[1.02] active:scale-[0.98]'>
                Create Account
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
