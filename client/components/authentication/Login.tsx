"use client";

import { Formik, Form } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextInput } from "@/components/common/input";
import { loginSchema } from "@/lib/authSchemas";
import { useAuth } from "@/lib/context/AuthContext";
import Background from "../common/Background";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  return (
    <div className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0f0f23] p-6 font-sans'>
      {/* Animated Background Orbs */}
      <Background />

      <div className='relative z-10 w-full max-w-md backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
            Welcome Back
          </h1>
          <p className='text-gray-400 p-5'>
            Sign in to continue to your account
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            login(values);
            setSubmitting(false);
          }}>
          {({ isSubmitting }) => (
            <Form className='space-y-2'>
              <TextInput
                name='email'
                label='Email Address'
                type='email'
                placeholder='Enter your email'
              />
              <TextInput
                name='password'
                label='Password'
                type='password'
                placeholder='Enter your password'
              />

              <button
                type='submit'
                disabled={isSubmitting}
                className={`w-full py-3.5 mt-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-white/10 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-indigo-500/30"
                }`}>
                {isSubmitting ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className='mt-8 text-center'>
          <p className='text-gray-400 text-sm'>
            Don&apos;t have an account?{" "}
            <Link
              href='/register'
              className='font-semibold text-blue-400 hover:text-blue-300 transition-colors'>
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
