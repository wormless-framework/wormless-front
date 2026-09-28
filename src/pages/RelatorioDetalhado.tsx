import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { SeverityBadge } from '../components/SeverityBadge';
import { EvidenceCard } from '../components/EvidenceCard';

export function RelatorioDetalhado() {
  const { analiseId } = useParams();
  const navigate = useNavigate();
  const [relatorio, setRelatorio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        const response = await fetch(`http://localhost:8080/relatorios/analise/${analiseId}`);
        if (!response.ok) throw new Error('Relatório detalhado não encontrado.');
        const data = await response.json();
        setRelatorio(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRelatorio();
  }, [analiseId]);

  if (loading) return <div className="text-wl-lime p-8 font-orbitron text-xl animate-pulse">A descodificar relatório forense...</div>;
  if (error) return <div className="text-red-500 p-8 font-tech text-xl border border-red-500 bg-red-900/20">{error}</div>;
  if (!relatorio) return null;

  const ameaca = relatorio.indicadores?.[0]?.ameaca;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fade-in pb-12">
      
      {/* CABEÇALHO */}
      <header className="flex justify-between items-end border-b-2 border-wl-lime pb-4">
        <div>
          <h1 className="font-orbitron text-4xl font-bold text-white tracking-wider uppercase">
            Relatório Forense
          </h1>
          <p className="text-gray-400 font-tech text-lg uppercase tracking-widest mt-1">
            Job ID #{relatorio.analiseJob?.id} • Data: {new Date(relatorio.dataGeracao).toLocaleString()}
          </p>
        </div>
        <SeverityBadge severity={relatorio.severidadeGeral} />
      </header>

      {/* DIAGNÓSTICO DA IA */}
      <section className="bg-wl-surface p-6 border-l-4 border-wl-lime">
        <h2 className="text-wl-lime font-orbitron text-xl mb-2 uppercase">Resumo da IA</h2>
        <p className="text-gray-300 font-sans leading-relaxed text-lg">{relatorio.resumo}</p>
      </section>

      {/* DETALHES DA AMEAÇA E REMEDIAÇÃO */}
      {ameaca && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-wl-surface border border-gray-800 p-6 flex flex-col">
            <h2 className="text-white font-orbitron text-xl mb-4 border-b border-gray-700 pb-2">Vetor de Ataque</h2>
            <div className="space-y-4 font-sans text-gray-300 flex-1">
              <p><strong className="text-wl-lime">Nome:</strong> {ameaca.nome}</p>
              <p><strong className="text-wl-lime">Tipo:</strong> {ameaca.tipo}</p>
              <div>
                <strong className="text-wl-lime block mb-1">Modus Operandi:</strong>
                <p className="text-sm bg-[#0a0a0a] p-3 rounded border border-gray-800 leading-relaxed">
                  {ameaca.comoAge}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-wl-surface border border-gray-800 p-6 flex flex-col">
            <h2 className="text-white font-orbitron text-xl mb-4 border-b border-gray-700 pb-2">Plano de Remediação</h2>
            <div className="bg-[#0a0a0a] p-4 text-sm text-gray-300 border border-gray-800 font-mono whitespace-pre-wrap leading-relaxed flex-1">
              {ameaca.remediacao?.orientacao || "Bloquear o ficheiro na pipeline imediatamente."}
            </div>
          </section>
        </div>
      )}

      {/* EVIDÊNCIAS DETETADAS (USANDO O COMPONENTE REUTILIZÁVEL) */}
      <section className="bg-wl-surface border border-gray-800 p-6 mt-2">
        <h2 className="text-white font-orbitron text-xl mb-4 border-b border-gray-700 pb-2">Evidências (Indicadores de Comprometimento)</h2>
        <div className="space-y-4">
          {relatorio.indicadores?.length > 0 ? (
            relatorio.indicadores.map((ind: any, idx: number) => (
              <EvidenceCard
                key={idx}
                linhaOcorrencia={ind.linhaOcorrencia}
                descricaoComportamento={ind.descricaoComportamento}
                trechoArquivo={ind.trechoArquivo}
                onMarkFalsePositive={() => console.log('Marcar falso positivo para o indicador:', ind.id)}
              />
            ))
          ) : (
            <p className="text-gray-400 italic">Nenhum indicador extraído.</p>
          )}
        </div>
      </section>

      <div className="mt-4 flex justify-start">
        <Button onClick={() => navigate('/upload')}>
          ← Voltar para Upload
        </Button>
      </div>

    </div>
  );
}