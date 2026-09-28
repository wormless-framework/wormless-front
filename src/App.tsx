import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { UploadPage } from './pages/UploadPage';
import Login from './pages/Login';
import { RequireAuth } from './components/RequireAuth';
import { useAuth } from './context/AuthContext';
import { homeForRole } from './api/auth';

// Qualquer rota desconhecida vai para a pagina inicial da role do usuario
function RoleRedirect() {
  const { role } = useAuth();
  return <Navigate to={role ? homeForRole(role) : '/login'} replace />;
}

function Shell() {
  return (
    <div className="flex h-screen w-full bg-wl-black transition-colors duration-200">
      {/* O menu lateral fica fixo na esquerda */}
      <Sidebar />

      {/* Esta div agrupa o Header e o Main para que fiquem um em cima do outro (flex-col) ocupando o resto do espaco (flex-1) */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            {/* Painel SOC: so analista/admin */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth allowedRoles={['SOC_ANALYST', 'SOC_ADMIN']}>
                  <Dashboard />
                </RequireAuth>
              }
            />

            {/* Sandbox: qualquer usuario autenticado */}
            <Route path="/upload" element={<UploadPage />} />

            <Route path="*" element={<RoleRedirect />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/*"
        element={
          <RequireAuth>
            <Shell />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
