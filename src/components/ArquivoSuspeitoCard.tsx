interface ArquivoSuspeitoProps {
  nome: string;
  caminho: string;
  motivoSuspeita: string;
  isScanning: boolean;
  onDeepScan: (caminho: string) => void;
}

export function ArquivoSuspeitoCard({
  nome,
  caminho,
  motivoSuspeita,
  isScanning,
  onDeepScan,
}: ArquivoSuspeitoProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0a0a0a] p-4 border-l-2 border-red-500">
      <div>
        <p className="text-white font-bold font-mono text-sm">{nome}</p>
        <p className="text-gray-500 text-xs font-mono mb-2">{caminho}</p>
        <p className="text-red-400 text-sm">{motivoSuspeita}</p>
      </div>
      <button
        onClick={() => onDeepScan(caminho)}
        disabled={isScanning}
        className="mt-4 md:mt-0 text-xs bg-transparent text-wl-lime border border-wl-lime hover:bg-wl-lime hover:text-black px-4 py-2 uppercase font-tech tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Análise Detalhada
      </button>
    </div>
  );
}