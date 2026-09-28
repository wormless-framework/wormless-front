import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar'; // Ajuste o caminho se necessário
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { UploadPage } from './pages/UploadPage';
import { RelatorioDetalhado } from './pages/RelatorioDetalhado'; // <-- 1. Importar a página

function App() {
  return (
    <div className="flex h-screen w-full bg-wl-black transition-colors duration-200">
      <Sidebar />
      
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadPage />} />
            
            {/* 2. Adicionar a rota dinâmica para o relatório detalhado da IA */}
            <Route path="/relatorio/:analiseId" element={<RelatorioDetalhado />} />
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} /> 
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;