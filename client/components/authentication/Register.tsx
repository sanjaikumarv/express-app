"use client";

import { Formik, Form } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextInput, NumberInput } from "@/components/common/input";
import { registerSchema } from "@/lib/authSchemas";
import apiClient from "@/lib/apiClient";
import { REGISTER } from "@/lib/endpoints";
import toast from "react-hot-toast";
import Background from "../common/Background";

interface RegisterFormValues {
  name: string;
  email: string;
  phone: number | "";
  password: string;
}

export default function Register() {
  const router = useRouter();

  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await apiClient.post(REGISTER, values);
      console.log("Register response:", response.data);

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (err: any) {
      console.log("Register error:", err);
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0f0f23] p-6 font-sans'>
      {/* Animated Background Orbs */}
      <Background />
      <div className='relative z-10 w-full max-w-md backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
            Create Account
          </h1>
          <p className='text-gray-400 p-2'>Join us today and get started</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className='space-y-2'>
              <TextInput
                name='name'
                label='Full Name'
                type='text'
                placeholder='Enter your full name'
              />

              <TextInput
                name='email'
                label='Email Address'
                type='email'
                placeholder='Enter your email'
              />

              <NumberInput
                name='phone'
                label='Phone Number'
                placeholder='Enter your phone number'
              />

              <TextInput
                name='password'
                label='Password'
                type='password'
                placeholder='Create a password'
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className='mt-8 text-center'>
          <p className='text-gray-400 text-sm'>
            Already have an account?{" "}
            <Link
              href='/login'
              className='font-semibold text-blue-400 hover:text-blue-300 transition-colors'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
