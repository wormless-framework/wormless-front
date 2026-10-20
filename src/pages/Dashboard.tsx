import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineDocument, HiOutlineShieldExclamation, HiOutlineBugAnt, HiOutlineCheckBadge } from 'react-icons/hi2';
import { Table, type Column } from '../components/Table';

interface HistoricoRelatorio {
  analiseId: number;
  nomeArquivo: string;
  status: string;
  dataInicio: string;
  severidade: string | null;
}

interface DashboardData {
  totalAnalises: number;
  totalAmeacas: number;
  totalVulnerabilidades: number;
  totalFalsosPositivos: number;
  analisesPorSeveridade: Record<string, number>;
  ultimasAnalises: HistoricoRelatorio[];
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/dashboard', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) throw new Error('Falha ao carregar métricas do dashboard.');
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-wl-lime p-8 font-orbitron text-xl animate-pulse">A extrair métricas do SOC...</div>;
  if (error) return <div className="text-red-500 p-8 font-tech text-xl border border-red-500 bg-red-900/20">{error}</div>;

  // Definição das colunas da Tabela de Análises Recentes
  const columns: Column<HistoricoRelatorio>[] = [
    {
      header: 'ID',
      className: 'w-16',
      accessor: (row) => <span className="font-bold text-gray-500">#{row.analiseId}</span>
    },
    {
      header: 'Arquivo',
      accessor: (row) => <span className="text-white font-bold">{row.nomeArquivo}</span>
    },
    {
      header: 'Data',
      accessor: (row) => <span className="text-gray-400">{new Date(row.dataInicio).toLocaleString()}</span>
    },
    {
      header: 'Status',
      accessor: (row) => (
        <span className={`text-xs px-2 py-1 uppercase font-tech tracking-widest ${
          row.status === 'CONCLUIDO' ? 'bg-wl-lime/20 text-wl-lime' : 'bg-gray-800 text-gray-400'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Severidade',
      accessor: (row) => {
        if (!row.severidade) return <span className="text-gray-600">-</span>;
        
        let colorClass = 'text-gray-500';
        
        if (row.severidade === 'CRITICA' || row.severidade === 'ALTA') {
          colorClass = 'text-red-500';
        } else if (row.severidade === 'MEDIA') {
          colorClass = 'text-yellow-500';
        } else if (row.severidade === 'BAIXA') {
          colorClass = 'text-wl-lime';
        }

        return (
          <span className={`font-bold ${colorClass}`}>
            {row.severidade}
          </span>
        );
      }
    },
    {
      header: 'Ação',
      className: 'text-right',
      accessor: (row) => (
        <div className="flex justify-end">
          <Link 
            to={`/relatorio/${row.analiseId}`}
            className="text-xs bg-transparent text-wl-lime border border-wl-lime hover:bg-wl-lime hover:text-black px-4 py-2 uppercase font-tech tracking-widest transition-colors"
          >
            Ver Relatório
          </Link>
        </div>
      )
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 animate-fade-in pb-12">
      <header className="border-b-2 border-wl-lime pb-4 mb-8">
        <h1 className="font-orbitron text-4xl font-bold text-white tracking-wider uppercase">
          Dashboard de Segurança
        </h1>
        <p className="text-gray-400 font-tech text-lg uppercase tracking-widest mt-1">
          Visão Global do Centro de Operações (SOC)
        </p>
      </header>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Arquivos Analisados" 
          value={data?.totalAnalises || 0} 
          icon={<HiOutlineDocument className="w-10 h-10 text-wl-lime opacity-80" />} 
        />
        <StatCard 
          title="Ameaças Detectadas" 
          value={data?.totalAmeacas || 0} 
          icon={<HiOutlineShieldExclamation className="w-10 h-10 text-red-500 opacity-80" />} 
          borderColor="border-red-500"
        />
        <StatCard 
          title="Falsos Positivos" 
          value={data?.totalFalsosPositivos || 0} 
          icon={<HiOutlineCheckBadge className="w-10 h-10 text-gray-500 opacity-80" />} 
          borderColor="border-gray-600"
        />
      </div>

      {/* Painel Secundário: Agrupamento por Severidade */}
      <div className="bg-wl-surface border-2 border-gray-800 p-6 rounded-sm shadow-lg mb-8">
        <h2 className="text-white font-orbitron text-xl mb-6 border-b border-gray-800 pb-3">
          Indicadores por Severidade
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SeverityStat label="CRÍTICA" count={data?.analisesPorSeveridade?.['CRITICA'] || 0} color="text-red-600" />
          <SeverityStat label="ALTA" count={data?.analisesPorSeveridade?.['ALTA'] || 0} color="text-red-400" />
          <SeverityStat label="MÉDIA" count={data?.analisesPorSeveridade?.['MEDIA'] || 0} color="text-yellow-500" />
          <SeverityStat label="BAIXA" count={data?.analisesPorSeveridade?.['BAIXA'] || 0} color="text-wl-lime" />
        </div>
      </div>

      {/* Tabela de Últimas Análises */}
      <div className="bg-wl-surface border-2 border-gray-800 p-6 rounded-sm shadow-lg">
        <h2 className="text-white font-orbitron text-xl mb-6 border-b border-gray-800 pb-3">
          Análises Recentes
        </h2>
        <Table 
          data={data?.ultimasAnalises || []} 
          columns={columns} 
          keyExtractor={(row) => row.analiseId} 
          emptyMessage="Nenhuma análise registada no sistema." 
        />
      </div>
    </main>
  );
}

function StatCard({ title, value, icon, borderColor = "border-wl-lime" }: { title: string, value: number, icon: React.ReactNode, borderColor?: string }) {
  return (
    <div className={`h-36 rounded-sm bg-wl-surface shadow-sm border-l-4 ${borderColor} flex items-center justify-between p-6 transition-transform hover:translate-x-1 hover:bg-wl-surface-hover`}>
      <div className="flex flex-col justify-center gap-1">
        <span className="text-xs font-tech uppercase tracking-widest text-gray-400">{title}</span>
        <span className="text-5xl font-bold font-orbitron text-white">{value}</span>
      </div>
      <div>{icon}</div>
    </div>
  );
}

function SeverityStat({ label, count, color }: { label: string, count: number, color: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#0a0a0a] border border-gray-800/50 hover:border-gray-700 transition-colors rounded-sm">
      <span className={`text-4xl font-orbitron font-bold ${color}`}>{count}</span>
      <span className="text-xs font-tech uppercase tracking-widest text-gray-500 mt-3">{label}</span>
    </div>
  );
}