import { useEffect, useState } from 'react';
import { getUserIdFromToken } from '../api/auth';
import { FalsoPositivoTable } from '../components/FalsoPositivoTable';

export function FalsosPositivos() {
  const [falsosPositivos, setFalsosPositivos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Carregar os dados
  useEffect(() => {
    const fetchFalsosPositivos = async () => {
      try {
        const token = localStorage.getItem('token');
        const analistaId = getUserIdFromToken() || 1;
        
        const response = await fetch(`http://localhost:8080/falsos-positivos/analista/${analistaId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) throw new Error('Falha ao carregar falsos positivos.');
        const data = await response.json();
        setFalsosPositivos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFalsosPositivos();
  }, []);

  // 2. Lógica para remover (reverter) um falso positivo
  const handleRemover = async (id: number) => {
    if (!window.confirm('Tens a certeza que pretendes reverter este falso positivo? A regra será reativada e o indicador voltará a ficar ativo.')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/falsos-positivos/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!response.ok) throw new Error('Falha ao remover o falso positivo.');

      // Remove o item da lista localmente para atualizar a UI sem recarregar a página
      setFalsosPositivos((prev) => prev.filter((fp) => fp.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="text-wl-lime p-8 font-orbitron text-xl animate-pulse">A carregar registos...</div>;
  if (error) return <div className="text-red-500 p-8 font-tech text-xl border border-red-500 bg-red-900/20">{error}</div>;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-fade-in pb-12">
      <header className="border-b-2 border-wl-lime pb-4">
        <h1 className="font-orbitron text-4xl font-bold text-white tracking-wider uppercase">
          Gestão de Falsos Positivos
        </h1>
        <p className="text-gray-400 font-tech text-lg uppercase tracking-widest mt-1">
          Indicadores ignorados e regras inativadas pelo SOC
        </p>
      </header>

      {/* A nossa tabela genérica encapsulada cuida de todo o visual pesado */}
      <div className="bg-wl-surface border-2 border-gray-800 p-6 rounded-sm shadow-lg">
        <FalsoPositivoTable 
          falsosPositivos={falsosPositivos} 
          onRemover={handleRemover} 
        />
      </div>
    </div>
  );
}