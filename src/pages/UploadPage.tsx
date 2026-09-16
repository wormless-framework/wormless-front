import { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { Button } from '../components/Button';

const DataFileIcon = () => (
  <svg className="w-14 h-14" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

export function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // <-- Novo estado!

  const handleUpload = (file: File) => {
    setSelectedFile(file);
  };

  const handleStartValidation = () => {
    if (!selectedFile) return;
    
    // 1. Inicia o carregamento (Botão gira e fica bloqueado)
    setIsUploading(true);
    console.log("Enviando arquivo para a API...");

    // 2. Simulação do tempo de resposta do servidor 
    setTimeout(() => {
      // 3. O que acontece quando o servidor responde:
      setIsUploading(false); // Para de girar
      alert(`Validação do arquivo "${selectedFile.name}" concluída com sucesso!`);
      
      // Limpar o arquivo se quiser que o usuário envie outro logo em seguida
      //setSelectedFile(null); 
    }, 3000); 
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      
      <div>
        <h1 className="font-orbitron text-4xl font-bold text-white mb-2 tracking-wider uppercase">
          Fazer Upload
        </h1>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
          Validação de Arquivos Sandbox
        </p>
      </div>

      <div className={isUploading ? "opacity-50 pointer-events-none transition-opacity" : ""}>
        <Dropzone 
          id="sandbox-text-upload"
          title="Enviar Arquivo"
          subtitle=""
          hint="TXT, CSV, LOG ou JSON"
          accept=".txt,.csv,.log,.json,text/plain"
          icon={<DataFileIcon />}
          onFileSelect={handleUpload}
        />
      </div>

      {selectedFile && (
        <div className="flex justify-end mt-2 animate-fade-in">
          <Button 
            onClick={handleStartValidation} 
            isLoading={isUploading}
          >
            Iniciar Validação
          </Button>
        </div>
      )}

    </div>
  );
}