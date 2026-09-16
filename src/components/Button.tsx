import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button 
      className={`bg-wl-lime text-black border-2 border-wl-lime px-8 py-3 
                 font-tech text-xl font-bold uppercase tracking-widest 
                 shadow-[4px_4px_0_0_var(--color-wl-lime-dark)] 
                 hover:translate-x-1 hover:translate-y-1 hover:shadow-none 
                 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111]
                 active:translate-x-1 active:translate-y-1 active:shadow-none
                 disabled:opacity-50 disabled:cursor-not-allowed 
                 transition-all duration-150 ease-out cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}