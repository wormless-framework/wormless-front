import { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { Button } from '../components/Button';
import { ArquivoSuspeitoCard } from '../components/ArquivoSuspeitoCard';
import { useNavigate } from 'react-router-dom';
import { HiDocumentArrowUp, HiCodeBracketSquare } from 'react-icons/hi2';

const DataFileIcon = () => (
  <svg className="w-14 h-14" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

interface ArquivoSuspeito {
  nome: string;
  caminho: string;
  motivoSuspeita: string;
}

export function UploadPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'arquivo' | 'repositorio'>('arquivo');
  
  // Estado para Arquivo Único
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  // Estado para Repositório
  const [repoUrl, setRepoUrl] = useState('');
  const [isScanningRepo, setIsScanningRepo] = useState(false);
  const [suspeitos, setSuspeitos] = useState<ArquivoSuspeito[] | null>(null);

  const handleUploadFile = (file: File) => {
    setSelectedFile(file);
  };

  const handleStartFileValidation = async () => {
    if (!selectedFile) return;
    setIsUploadingFile(true);

    const formData = new FormData();
    formData.append('arquivo', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/sandbox/analises', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!response.ok) throw new Error('Falha na comunicação com o servidor.');
      const data = await response.json();
      console.log("Resposta do Backend (Upload):", data); 
      
      // Procura o ID na propriedade analiseId, se não existir, tenta na propriedade id
      const idCorreto = data.analiseId || data.id; 
      
      if (!idCorreto) {
         alert("Erro: O backend não devolveu o ID do relatório. Veja o console.");
         return;
      }
      
      navigate(`/relatorio/${idCorreto}`);
    } catch (error) {
      console.error("Erro ao validar arquivo:", error);
      alert("Ocorreu um erro ao enviar o arquivo.");
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleDeepScan = async (caminhoArquivo: string) => {
    setIsScanningRepo(true); 
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/sandbox/repositorio/deep-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ 
          url: repoUrl, 
          caminhoArquivo: caminhoArquivo 
        }),
      });

      if (!response.ok) throw new Error('Falha ao iniciar Deep Scan.');
      
      const data = await response.json();
      console.log("Resposta do Backend (Deep Scan):", data); 
      
      // Procura o ID na propriedade analiseId, se não existir, tenta na propriedade id
      const idCorreto = data.analiseId || data.id;
      
      if (!idCorreto) {
         alert("Erro: O backend não devolveu o ID do relatório. Veja o console.");
         return;
      }
      
      navigate(`/relatorio/${idCorreto}`);
      
    } catch (error) {
      console.error("Erro no Deep Scan:", error);
      alert("Ocorreu um erro ao executar a análise profunda.");
    } finally {
      setIsScanningRepo(false);
    }
  };

  const handleScanRepository = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;
    
    setIsScanningRepo(true);
    setSuspeitos(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/sandbox/repositorio/triagem', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ url: repoUrl }),
      });

      if (!response.ok) throw new Error('Falha ao clonar ou escanear o repositório.');
      const data = await response.json();
      setSuspeitos(data);
    } catch (error) {
      console.error("Erro ao escanear repositório:", error);
      alert("Ocorreu um erro na triagem do repositório.");
    } finally {
      setIsScanningRepo(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="font-orbitron text-4xl font-bold text-white mb-2 tracking-wider uppercase">
          Análise de Ameaças
        </h1>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
          Escolha o método de análise.
        </p>
      </div>

      {/* Navegação por Abas */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab('arquivo')}
          className={`flex items-center gap-2 px-6 py-3 font-tech text-xl font-bold uppercase tracking-widest transition-colors ${
            activeTab === 'arquivo' 
              ? 'text-wl-lime border-b-2 border-wl-lime' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <HiDocumentArrowUp className="w-6 h-6" />
          Arquivo Único
        </button>
        <button
          onClick={() => setActiveTab('repositorio')}
          className={`flex items-center gap-2 px-6 py-3 font-tech text-xl font-bold uppercase tracking-widest transition-colors ${
            activeTab === 'repositorio' 
              ? 'text-wl-lime border-b-2 border-wl-lime' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <HiCodeBracketSquare className="w-6 h-6" />
          Repositório Git
        </button>
      </div>

      {/* Conteúdo Aba: Arquivo Único */}
      {activeTab === 'arquivo' && (
        <div className={`animate-fade-in ${isUploadingFile ? "opacity-50 pointer-events-none" : ""}`}>
          <Dropzone 
            id="sandbox-pdf-upload"
            title="Enviar Artefato"
            subtitle=""
            hint="Apenas ficheiros PDF (Max 100MB)"
            accept=".pdf,application/pdf"
            icon={<DataFileIcon />}
            onFileSelect={handleUploadFile}
          />
          {selectedFile && (
            <div className="flex justify-end mt-4">
              <Button onClick={handleStartFileValidation} isLoading={isUploadingFile}>
                Iniciar Validação Profunda
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Conteúdo Aba: Repositório */}
      {activeTab === 'repositorio' && (
        <div className="animate-fade-in flex flex-col gap-6">
          <form onSubmit={handleScanRepository} className="flex gap-4">
            <input
              type="url"
              placeholder="https://github.com/usuario/repositorio.git"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              required
              className="flex-1 bg-wl-surface border border-gray-800 rounded-none px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-wl-lime font-mono text-sm"
            />
            <Button type="submit" isLoading={isScanningRepo}>
              Rodar Análise
            </Button>
          </form>

          {/* Lista de Arquivos Suspeitos */}
          {suspeitos && (
            <div className="bg-wl-surface border-2 border-gray-800 p-6 mt-2">
              <h2 className="text-white font-orbitron text-xl mb-4 border-b border-gray-800 pb-2 flex justify-between items-center">
                Arquivos Sinalizados na Triagem
                <span className="bg-red-500/20 text-red-500 text-sm font-bold px-3 py-1 font-tech uppercase">
                  {suspeitos.length} encontrados
                </span>
              </h2>
              
              {suspeitos.length === 0 ? (
                <p className="text-wl-lime font-mono text-sm">✓ Nenhum arquivo malicioso encontrado no Shallow Scan.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {suspeitos.map((arq, idx) => (
                    <ArquivoSuspeitoCard
                      key={idx}
                      nome={arq.nome}
                      caminho={arq.caminho}
                      motivoSuspeita={arq.motivoSuspeita}
                      isScanning={isScanningRepo}
                      onDeepScan={handleDeepScan}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}