import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div className="flex h-screen w-full bg-wl-black transition-colors duration-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;