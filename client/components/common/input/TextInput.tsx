"use client";

import { useField } from "formik";

interface TextInputProps {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: any;
}

export function TextInput({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
}: TextInputProps) {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div className='mb-5'>
      <label
        htmlFor={name}
        className='block text-sm font-medium text-gray-300 mb-2 ml-1'>
        {label}
      </label>
      <input
        {...field}
        autoComplete={name}
        id={name}
        type={type}
        placeholder={placeholder || label}
        className={`w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all font-medium ${
          hasError ? "border-red-500/50 focus:border-red-500" : ""
        }`}
      />
      {hasError && (
        <div className='mt-1 ml-1 text-sm text-red-500'>{meta.error}</div>
      )}
    </div>
  );
}
