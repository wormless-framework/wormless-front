interface EvidenceCardProps {
  linhaOcorrencia: number;
  descricaoComportamento: string;
  trechoArquivo: string;
  onMarkFalsePositive?: () => void;
}

export function EvidenceCard({ 
  linhaOcorrencia, 
  descricaoComportamento, 
  trechoArquivo, 
  onMarkFalsePositive 
}: EvidenceCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-[#0a0a0a] p-4 border-l-2 border-red-500 items-center">
      <div className="text-red-500 font-tech font-bold text-xl min-w-[80px]">
        L{linhaOcorrencia}
      </div>
      
      <div className="flex-1 overflow-hidden">
        <p className="text-gray-400 text-sm mb-1">{descricaoComportamento}</p>
        <code className="text-wl-lime bg-black px-2 py-1 rounded font-mono text-sm break-all">
          {trechoArquivo}
        </code>
      </div>

      <div className="self-start md:self-center">
        <button 
          onClick={onMarkFalsePositive}
          className="text-xs bg-red-900/30 text-red-500 hover:bg-red-500 hover:text-white border border-red-500 px-3 py-2 uppercase tracking-wider transition-colors cursor-pointer"
        >
          Falso Positivo?
        </button>
      </div>
    </div>
  );
}