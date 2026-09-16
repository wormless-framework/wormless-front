import type { ReactNode } from 'react';

interface DropzoneProps {
  id: string;
  title?: string;
  subtitle?: string;
  hint?: string;
  accept?: string;
  icon?: ReactNode;
}

export function Dropzone({ 
  id, 
  title = "Click to upload", 
  subtitle = "or drag and drop", 
  hint, 
  accept, 
  icon 
}: DropzoneProps) {
  
  return (
    <div className="flex items-center justify-center w-full">
      <label 
        htmlFor={id} 
        className="flex flex-col items-center justify-center w-full h-72 
                   bg-wl-surface border-2 border-wl-lime 
                   /* 1. Sombra com o verde mais escuro: */
                   shadow-[8px_8px_0_0_var(--color-wl-lime-dark)] 
                   cursor-pointer 
                   /* 2. Hover e clique mantendo a cor escura e mudando o fundo: */
                   hover:bg-wl-surface-hover hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0_0_var(--color-wl-lime-dark)] 
                   active:translate-x-[8px] active:translate-y-[8px] active:shadow-none
                   transition-all duration-150 ease-out"
      >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
              
              {icon && <div className="mb-4 text-wl-lime">{icon}</div>}
              
              <p className="font-tech mb-2 text-center text-2xl uppercase font-bold tracking-widest text-wl-lime">
                {title}
                <span className="block mt-1 text-white font-medium text-lg">
                  {subtitle}
                </span>
              </p>
              
              {hint && (
                <p className="text-sm text-gray-500 font-medium">{hint}</p>
              )}
          </div>
          
          <input 
            id={id} 
            type="file" 
            className="hidden" 
            accept={accept} 
          />
      </label>
    </div> 
  );
}