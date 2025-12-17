"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const isAuthenticated = !!user;

  const handleLogout = () => {
    router.push("/logout");
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className='auth-container'>
        <div
          className='spinner'
          style={{ width: "40px", height: "40px" }}></div>
      </div>
    );
  }

  return (
    <div className='auth-container'>
      <div className='auth-background'>
        <div className='gradient-orb orb-1'></div>
        <div className='gradient-orb orb-2'></div>
        <div className='gradient-orb orb-3'></div>
      </div>

      <div className='auth-card' style={{ maxWidth: "600px" }}>
        <div className='auth-header'>
          <h1 className='auth-title'>
            {isAuthenticated ? `Welcome, ${user.name}!` : "Get Started"}
          </h1>
          <p className='auth-subtitle'>
            {isAuthenticated
              ? `Email: ${user.email}`
              : "Create an account or sign in to continue"}
          </p>
        </div>

        {isAuthenticated ? (
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: "2rem", opacity: 0.8 }}>
              You have access to the application. Start exploring!
            </p>
            <button onClick={handleLogout} className='auth-button'>
              Logout
            </button>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link href='/login'>
              <button className='auth-button'>Sign In</button>
            </Link>
            <Link href='/register'>
              <button
                className='auth-button'
                style={{
                  background: "transparent",
                  border: "2px solid var(--primary)",
                  color: "var(--foreground)",
                }}>
                Create Account
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
