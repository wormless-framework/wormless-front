import { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { Button } from '../components/Button';
import { TestReport } from '../components/TestReport';

const DataFileIcon = () => (
  <svg className="w-14 h-14" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

export function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [reportData, setReportData] = useState<{ title: string; content: string } | null>(null);

  const handleUpload = (file: File) => {
    setSelectedFile(file);
  };

  const handleStartValidation = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);

    const formData = new FormData();

    formData.append('arquivo', selectedFile); 

    try {
      const response = await fetch('http://localhost:8080/sandbox/analises', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Se a API devolver um erro (ex: 400 Bad Request se não for PDF)
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || 'Falha na comunicação com o servidor.';
        throw new Error(errorMessage);
      }

      // Lê a resposta JSON baseada no AnaliseJobResponseDTO do backend
      const data = await response.json();
      
      // Formata a resposta para exibir no TestReport
      let relatorioConteudo = `Status da Análise: ${data.status}\n`;
      relatorioConteudo += `Ameaça Detectada: ${data.ameacaDetectada ? 'SIM' : 'NÃO'}\n`;
      relatorioConteudo += `Severidade: ${data.severidade || 'N/A'}\n`;
      relatorioConteudo += `\nResumo: ${data.resumo}\n`;
      
      if (data.testes && data.testes.length > 0) {
        relatorioConteudo += `\nTestes Falhados:\n- ${data.testes.join('\n- ')}`;
      } else {
        relatorioConteudo += `\nNenhuma ameaça estática encontrada no documento.`;
      }

      setReportData({
        title: `RELATÓRIO DE ANÁLISE #${data.analiseId}`,
        content: relatorioConteudo
      });

    } catch (error: any) {
      console.error("Erro ao validar arquivo:", error);
      alert(`Ocorreu um erro: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setReportData(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      
      <div>
        <h1 className="font-orbitron text-4xl font-bold text-white mb-2 tracking-wider uppercase">
          {reportData ? "Resultado" : "Fazer Upload"}
        </h1>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
          Validação de Arquivos Sandbox
        </p>
      </div>

      {reportData ? (
        <TestReport 
          title={reportData.title} 
          content={reportData.content} 
          onReset={handleReset} 
        />
      ) : (
        <>
          <div className={isUploading ? "opacity-50 pointer-events-none transition-opacity" : ""}>
            <Dropzone 
              id="sandbox-text-upload"
              title="Enviar Arquivo PDF"
              subtitle=""
              hint="Apenas ficheiros PDF (Max 100MB)"
              accept=".pdf,application/pdf"
              icon={<DataFileIcon />}
              onFileSelect={handleUpload}
            />
          </div>

          {selectedFile && (
            <div className="flex justify-end mt-2 animate-fade-in">
              <Button onClick={handleStartValidation} isLoading={isUploading}>
                Iniciar Validação
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}