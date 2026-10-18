import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, type Column } from '../components/Table';
import { SeverityBadge } from '../components/SeverityBadge';

interface Relatorio {
  analiseId: number;
  nomeArquivo: string;
  status: string;
  dataInicio?: string;
  severidade?: string | null;
  resumo?: string | null;
}

interface PaginaRelatorios {
  content: Relatorio[];
  number: number;
  totalPages: number;
  totalElements: number;
}

export function Historico() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalRelatorios, setTotalRelatorios] = useState(0);

  useEffect(() => {
    const carregarRelatorios = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/me/relatorios?pagina=${pagina}&tamanho=20`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) throw new Error('Falha ao carregar o histórico de relatórios.');
        const data: PaginaRelatorios = await response.json();
        setRelatorios(data.content ?? []);
        setTotalPaginas(data.totalPages ?? 0);
        setTotalRelatorios(data.totalElements ?? 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao carregar o histórico de relatórios.');
      } finally {
        setLoading(false);
      }
    };

    void carregarRelatorios();
  }, [pagina]);

  const columns: Column<Relatorio>[] = [
    { header: 'Arquivo', accessor: 'nomeArquivo' },
    { header: 'Data', accessor: (row) => row.dataInicio ? new Date(row.dataInicio).toLocaleString() : '—' },
    { header: 'Status', accessor: 'status' },
    { header: 'Severidade', accessor: (row) => row.severidade ? <SeverityBadge severity={row.severidade} /> : '—' },
    { header: 'Resumo', accessor: (row) => row.resumo || 'Relatório ainda indisponível.' },
    {
      header: 'Ação',
      accessor: (row) => row.status === 'CONCLUIDO' ? (
        <Link to={`/relatorio/analise/${row.analiseId}`} className="text-wl-lime hover:underline">
          Ver relatório
        </Link>
      ) : <span className="text-gray-500">Indisponível</span>,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-fade-in pb-12">
      <header className="border-b-2 border-wl-lime pb-4">
        <h1 className="font-orbitron text-4xl font-bold text-white tracking-wider uppercase">Histórico de relatórios</h1>
        <p className="text-gray-400 font-tech text-lg uppercase tracking-widest mt-1">
          Relatórios das análises realizadas na sua conta
        </p>
      </header>

      <section className="bg-wl-surface border-2 border-gray-800 p-6 rounded-sm shadow-lg">
        {loading ? (
          <p className="text-wl-lime font-mono animate-pulse">Carregando relatórios...</p>
        ) : error ? (
          <p role="alert" className="text-red-500 font-mono">{error}</p>
        ) : (
          <Table
            data={relatorios}
            columns={columns}
            keyExtractor={(row) => row.analiseId}
            emptyMessage="Você ainda não possui relatórios."
          />
        )}
        {!loading && !error && totalPaginas > 0 && (
          <div className="flex items-center justify-between mt-5 text-sm text-gray-300 font-mono">
            <span>{totalRelatorios} análises · página {pagina + 1} de {totalPaginas}</span>
            <div className="flex gap-3">
              <button type="button" disabled={pagina === 0} onClick={() => setPagina((atual) => Math.max(0, atual - 1))}
                className="px-3 py-2 border border-gray-700 enabled:hover:border-wl-lime enabled:hover:text-wl-lime disabled:opacity-40">
                Anterior
              </button>
              <button type="button" disabled={pagina + 1 >= totalPaginas} onClick={() => setPagina((atual) => atual + 1)}
                className="px-3 py-2 border border-gray-700 enabled:hover:border-wl-lime enabled:hover:text-wl-lime disabled:opacity-40">
                Próxima
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
