import { Button } from './Button';

interface TestReportProps {
  title: string;
  content: string;
  onReset: () => void;
}

export function TestReport({ title, content, onReset }: TestReportProps) {
  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in">
      
      {/* Caixa do Relatório */}
      <div className="w-full bg-wl-black border-2 border-wl-lime shadow-[8px_8px_0_0_var(--color-wl-lime-dark)] p-6">
        
        {/* Cabeçalho do Relatório */}
        <div className="border-b-2 border-wl-lime pb-4 mb-4 flex items-center gap-3">
          <svg className="w-8 h-8 text-wl-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="font-tech text-2xl font-bold uppercase tracking-widest text-wl-lime">
            {title}
          </h2>
        </div>

        {/* Corpo do Texto */}
        <div className="bg-[#0a0a0a] p-4 border border-gray-800 text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
          {content}
        </div>
      </div>

      <div className="flex justify-start mt-2">
        <Button onClick={onReset}>
          ← Voltar para Upload
        </Button>
      </div>
      
    </div>
  );
}