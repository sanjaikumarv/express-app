import React from "react";

export default function Background() {
  return (
    <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none'>
      <div className='absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-linear-to-br from-[#667eea] to-[#764ba2] opacity-20 blur-[80px] animate-[float_20s_ease-in-out_infinite]' />
      <div className='absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-linear-to-br from-[#f093fb] to-[#f5576c] opacity-20 blur-[80px] animate-[float_20s_ease-in-out_infinite_5s]' />
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[350px] h-[350px] rounded-full bg-linear-to-br from-[#4facfe] to-[#00f2fe] opacity-20 blur-[80px] animate-[float_20s_ease-in-out_infinite_10s]' />
    </div>
  );
}
