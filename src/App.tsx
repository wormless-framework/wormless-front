import { Routes, Route, Navigate } from 'react-router-dom'; // Importei o Navigate aqui
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { UploadPage } from './pages/UploadPage';

function App() {
  return (
    <div className="flex h-screen w-full bg-wl-black transition-colors duration-200">
      {/* O menu lateral fica fixo na esquerda */}
      <Sidebar />
      
      {/* Esta div agrupa o Header e o Main para que fiquem um em cima do outro (flex-col) ocupando o resto do espaço (flex-1) */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadPage />} />
            
            {/* O Navigate altera de fato a URL no navegador, em vez de apenas renderizar o componente na URL errada */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} /> 
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;