import { HiOutlineDocumentText, HiOutlineLink, HiOutlineUpload, HiOutlineTrash } from 'react-icons/hi';
import { Table } from './Table';
import type { Column } from './Table';

const formatRepoName = (url: string) => {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.substring(1).replace(/\.git$/, '');
  } catch {
    return url;
  }
};

interface FalsoPositivoTableProps {
  falsosPositivos: any[];
  onRemover: (id: number) => void;
}

export function FalsoPositivoTable({ falsosPositivos, onRemover }: FalsoPositivoTableProps) {
  
  // Define como cada coluna se deve comportar e o que deve desenhar
  const columns: Column<any>[] = [
    {
      header: 'ID',
      accessor: (fp) => <span className="font-bold text-gray-500">#{fp.id}</span>
    },
    {
      header: 'Data',
      className: 'whitespace-nowrap',
      accessor: (fp) => <span className="text-gray-400 whitespace-nowrap">{new Date(fp.dataMarcacao).toLocaleString()}</span>
    },
    {
      header: 'Origem',
      className: 'w-1/5',
      accessor: (fp) => {
        const isRepo = fp.origemRepositorio !== 'Upload Manual' && fp.origemRepositorio !== 'N/A';
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <HiOutlineDocumentText className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span className="text-white font-bold text-sm break-all" title={fp.nomeArquivo}>{fp.nomeArquivo}</span>
            </div>
            {isRepo ? (
              <a href={fp.origemRepositorio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-wl-lime font-tech tracking-widest transition-colors w-fit">
                <HiOutlineLink className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate max-w-[150px]">{formatRepoName(fp.origemRepositorio)}</span>
              </a>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-tech uppercase tracking-widest">
                <HiOutlineUpload className="w-3.5 h-3.5 shrink-0" />
                <span>Upload Manual</span>
              </div>
            )}
          </div>
        );
      }
    },
    {
      header: 'Indicador Original',
      className: 'w-1/3',
      accessor: (fp) => fp.indicadorAmeaca ? (
        <div className="flex flex-col gap-3">
          <span className="text-xs text-gray-400 leading-relaxed">{fp.indicadorAmeaca.descricaoComportamento}</span>
          <div className="bg-black border border-gray-800 p-2 rounded max-h-32 overflow-y-auto">
            <code className="text-wl-lime text-xs break-all whitespace-pre-wrap">{fp.indicadorAmeaca.trechoArquivo}</code>
          </div>
        </div>
      ) : <span className="text-gray-500 italic">Indicador não disponível</span>
    },
    {
      header: 'Justificativa',
      className: 'w-1/4',
      accessor: (fp) => <span className="text-gray-300 leading-relaxed break-words">{fp.justificativaTecnica}</span>
    },
    {
      header: 'Regra Inativada',
      className: 'text-center',
      accessor: (fp) => (
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs text-gray-300 font-bold whitespace-nowrap">Regra #{fp.regraDeteccao?.id || 'N/A'}</span>
          <span className="text-[11px] text-gray-500 break-words w-full px-2">{fp.regraDeteccao?.padrao}</span>
        </div>
      )
    },
    {
      header: 'Ações',
      className: 'text-center',
      accessor: (fp) => (
        <div className="flex justify-center">
          <button
            onClick={() => onRemover(fp.id)}
            className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 p-2 rounded transition-all outline-none focus:ring-1 focus:ring-red-500 group"
            title="Reverter Falso Positivo"
          >
            <HiOutlineTrash className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )
    }
  ];

  return (
    <Table 
      data={falsosPositivos} 
      columns={columns} 
      keyExtractor={(fp) => fp.id} 
      emptyMessage="Nenhum falso positivo registado no teu utilizador." 
    />
  );
}