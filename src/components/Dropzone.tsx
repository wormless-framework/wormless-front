import { useState, type ReactNode, type ChangeEvent } from 'react';

interface DropzoneProps {
  id: string;
  title?: string;
  subtitle?: string;
  hint?: string;
  accept?: string;
  icon?: ReactNode;
  onFileSelect?: (file: File) => void; 
}

export function Dropzone({ 
  id, 
  title = "Click to upload", 
  subtitle = "or drag and drop", 
  hint, 
  accept, 
  icon,
  onFileSelect
}: DropzoneProps) {
  // Estados para controlar o arquivo e possíveis erros
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // Função que roda quando o usuário escolhe um arquivo
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    // const maxSizeInBytes = 5 * 1024 * 1024;

    // if (file.size > maxSizeInBytes) {
    //   setError("Alerta: O arquivo excede o limite de 5MB!");
    //   setFileName(null);
    //   event.target.value = ''; // Limpa o input
    //   return;
    // }

    // Se passou na validação, salva o nome e limpa os erros
    setError(null);
    setFileName(file.name);
    
    if (onFileSelect) {
      onFileSelect(file);
    }
  };
  
  return (
    <div className="flex items-center justify-center w-full">
      <label 
        htmlFor={id} 
        className="flex flex-col items-center justify-center w-full h-72 
                   bg-wl-surface border-2 border-wl-lime 
                   shadow-[8px_8px_0_0_var(--color-wl-lime-dark)] 
                   cursor-pointer 
                   hover:bg-wl-surface-hover hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0_0_var(--color-wl-lime-dark)] 
                   active:translate-x-[8px] active:translate-y-[8px] active:shadow-none
                   transition-all duration-150 ease-out"
      >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none text-center">
              
              {icon && <div className="mb-4 text-wl-lime">{icon}</div>}
              
              {/* Feedback Visual: Mostra o nome do arquivo ou os textos padrão */}
              {fileName ? (
                <p className="font-tech mb-2 text-2xl uppercase font-bold tracking-widest text-white">
                  Arquivo Pronto: <span className="block mt-1 text-wl-lime">{fileName}</span>
                </p>
              ) : (
                <p className="font-tech mb-2 text-2xl uppercase font-bold tracking-widest text-wl-lime">
                  {title}
                  <span className="block mt-1 text-white font-medium text-lg">
                    {subtitle}
                  </span>
                </p>
              )}
              
              {/* Mostra o erro em vermelho se passar de 5MB, senão mostra o hint normal */}
              {error ? (
                <p className="text-sm text-red-500 font-bold mt-2">{error}</p>
              ) : (
                hint && !fileName && <p className="text-sm text-gray-500 font-medium">{hint}</p>
              )}
          </div>
          
          <input 
            id={id} 
            type="file" 
            className="hidden" 
            accept={accept} 
            onChange={handleFileChange}
          />
      </label>
    </div> 
  );
}