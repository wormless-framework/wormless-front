import { useState } from 'react';
import { Button } from './Button';

interface EvidenceCardProps {
  linhaOcorrencia: number;
  descricaoComportamento: string;
  trechoArquivo: string;
  isFalsePositive?: boolean;
  onMarkFalsePositive?: (justificativa: string) => Promise<void>;
}

export function EvidenceCard({ 
  linhaOcorrencia, 
  descricaoComportamento, 
  trechoArquivo, 
  onMarkFalsePositive,
  isFalsePositive // <-- Nova propriedade
}: any) {
  return (
    <div className={`border p-5 flex flex-col lg:flex-row gap-6 transition-colors ${
      isFalsePositive 
        ? 'bg-[#050505] border-gray-800/50 opacity-70' // Estilo mais apagado se for Falso Positivo
        : 'bg-[#0a0a0a] border-gray-800 hover:border-gray-700'
    }`}>
      
      {/* LINHA */}
      <div className="flex-shrink-0 w-16 pt-1">
        <span className={`${isFalsePositive ? 'text-gray-600' : 'text-red-500'} font-bold font-mono text-lg tracking-widest transition-colors`}>
          L{linhaOcorrencia}
        </span>
      </div>
      
      {/* CONTEÚDO DA EVIDÊNCIA */}
      <div className="flex-1 flex flex-col gap-4">
        <span className="text-sm text-gray-400 font-mono leading-relaxed">
          {descricaoComportamento}
        </span>
        <code className="bg-black text-wl-lime p-4 border border-gray-800 rounded-sm font-mono text-sm break-all whitespace-pre-wrap">
          {trechoArquivo}
        </code>
      </div>

      {/* ÁREA DE AÇÃO (Botão ou Badge) */}
      <div className="flex-shrink-0 flex items-start justify-end lg:justify-start lg:w-48 pt-1">
        {isFalsePositive ? (
          <div className="border border-gray-800 bg-[#0a0a0a] px-4 py-2 w-full lg:w-auto text-center cursor-not-allowed">
            <span className="text-gray-500 font-tech uppercase text-[10px] tracking-widest">
              Falso Positivo
            </span>
          </div>
        ) : (
          <button 
            onClick={onMarkFalsePositive}
            className="border border-red-900/50 text-red-500 hover:bg-red-900/20 hover:border-red-500 px-4 py-2 font-tech uppercase text-xs tracking-widest transition-all w-full lg:w-auto"
          >
            Falso Positivo?
          </button>
        )}
      </div>

    </div>
  );
}