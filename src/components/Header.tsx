import { DarkThemeToggle } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import iconWormless from '../assets/iconWormless.png';
import { useAuth } from '../context/AuthContext';
import { logout } from '../api/auth';

export function Header() {
  const { role, setRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setRole(null);
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-wl-surface">
      <div className="flex items-center gap-3">
        <img
          src={iconWormless}
          alt="Logo Wormless"
          className="w-8 h-8 mix-blend-screen"
        />
        <span className="font-orbitron text-2xl font-bold text-[#a3e635] tracking-widest uppercase">
          Wormless
        </span>
      </div>

      <div className="flex items-center gap-4">
        {role && (
          <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
            {role}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-xs font-medium uppercase tracking-widest text-gray-300 hover:text-wl-lime transition-colors"
        >
          Sair
        </button>
        <DarkThemeToggle />
      </div>
    </header>
  );
}
