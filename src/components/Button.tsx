import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({ children, className = '', isLoading = false, ...props }: ButtonProps) {
  return (
    <button 
      className={`bg-wl-black text-wl-lime border-2 border-wl-lime px-8 py-3 
                 font-tech text-xl font-bold uppercase tracking-widest flex items-center justify-center gap-3
                 shadow-[4px_4px_0_0_var(--color-wl-lime-dark)] 
                 hover:translate-x-1 hover:translate-y-1 hover:shadow-none 
                 focus:outline-none focus:ring-2 focus:ring-wl-lime focus:ring-offset-2 focus:ring-offset-wl-black
                 active:translate-x-1 active:translate-y-1 active:shadow-none
                 disabled:opacity-50 disabled:cursor-not-allowed 
                 transition-all duration-150 ease-out ${className}`}
      disabled={isLoading || props.disabled} // <-- Desabilita se estiver carregando
      {...props}
    >
      {isLoading ? (
        <>
          <svg 
            className="animate-spin h-6 w-6 text-wl-lime" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processando...
        </>
      ) : (
        children
      )}
    </button>
  );
}