"use client";

import { useField } from "formik";

interface NumberInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

export function NumberInput({ name, label, placeholder }: NumberInputProps) {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      helpers.setValue(value === "" ? "" : Number(value));
    }
  };

  return (
    <div className='mb-5'>
      <label
        htmlFor={name}
        className='block text-sm font-medium text-gray-300 mb-2 ml-1'>
        {label}
      </label>
      <input
        {...field}
        id={name}
        type='tel'
        placeholder={placeholder || label}
        className={`w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all font-medium ${
          hasError ? "border-red-500/50 focus:border-red-500" : ""
        }`}
        onChange={handleChange}
        value={field.value || ""}
      />
      {hasError && (
        <div className='mt-1 ml-1 text-sm text-red-500'>{meta.error}</div>
      )}
    </div>
  );
}
