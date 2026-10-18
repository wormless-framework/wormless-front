import { useState, useEffect } from 'react';
import { Button } from './Button';

interface FalsoPositivoModalProps {
  isOpen: boolean;
  regras: any[];
  onClose: () => void;
  onConfirm: (regraId: number, justificativa: string) => Promise<void>;
}

export function FalsoPositivoModal({ isOpen, regras, onClose, onConfirm }: FalsoPositivoModalProps) {
  const [regraSelecionada, setRegraSelecionada] = useState<number | ''>('');
  const [justificativa, setJustificativa] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reinicia os campos sempre que o modal é aberto
  useEffect(() => {
    if (isOpen) {
      setRegraSelecionada(regras.length > 0 ? regras[0].id : '');
      setJustificativa('');
    }
  }, [isOpen, regras]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!justificativa.trim()) return alert("A justificativa técnica é obrigatória.");
    if (!regraSelecionada) return alert("Por favor, selecione a regra de deteção associada.");

    setIsSubmitting(true);
    try {
      // Passa os dados para a página pai submeter à API
      await onConfirm(Number(regraSelecionada), justificativa);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-[#0f0f0f] border-2 border-gray-800 p-8 w-full max-w-2xl flex flex-col gap-6 shadow-2xl rounded-sm">
        <h3 className="text-2xl font-orbitron text-white uppercase tracking-widest border-b border-gray-800 pb-4">
          Marcar como Falso Positivo
        </h3>
        
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-xs text-gray-400 font-tech uppercase tracking-widest">
            Regra de Deteção Associada
          </label>
          <select
            value={regraSelecionada}
            onChange={(e) => setRegraSelecionada(Number(e.target.value))}
            className="bg-black border border-gray-800 text-gray-300 p-3.5 text-sm font-mono focus:border-wl-lime focus:outline-none focus:ring-1 focus:ring-wl-lime transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled>Selecione a regra acionada...</option>
            {regras.map((regra) => (
              <option key={regra.id} value={regra.id}>
                Regra #{regra.id} — Padrão: {regra.padrao}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400 font-tech uppercase tracking-widest">
            Justificativa Técnica
          </label>
          <textarea
            className="bg-black border border-gray-800 text-wl-lime p-4 h-36 font-mono text-sm focus:border-wl-lime focus:outline-none focus:ring-1 focus:ring-wl-lime resize-none transition-all placeholder-gray-700"
            placeholder="Descreva de forma concisa por que este indicador é um falso alarme e qual o seu verdadeiro propósito no código..."
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
          />
        </div>

        <div className="flex justify-end items-center gap-4 mt-4 pt-4 border-t border-gray-800/50">
          <button 
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-500 hover:text-white font-tech uppercase text-sm tracking-widest px-6 py-2.5 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          
          {/* Reutilizando o seu componente de Button */}
          <Button 
            onClick={handleConfirm}
            isLoading={isSubmitting}
            className="!bg-wl-lime !text-black !shadow-[4px_4px_0_0_#ffffff30] px-8 py-2.5"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}