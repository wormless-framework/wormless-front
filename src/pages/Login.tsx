import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, homeForRole } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await login(email, password);
      setRole(data.role);
      navigate(homeForRole(data.role));
    } catch {
      setError('Email ou senha invalidos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-wl-black flex items-center justify-center p-8">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div>
          <h1 className="font-orbitron text-4xl font-bold text-white mb-2 tracking-wider uppercase">
            Entrar
          </h1>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
            Acesso ao Sistema Wormless
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-gray-400 text-xs font-medium uppercase tracking-widest"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-wl-surface border border-wl-surface-hover rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-wl-lime transition-colors"
              placeholder="seuemail@wormless.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-gray-400 text-xs font-medium uppercase tracking-widest"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-wl-surface border border-wl-surface-hover rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-wl-lime transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm font-medium uppercase tracking-widest animate-fade-in">
              {error}
            </p>
          )}

          <div className="flex justify-end mt-2">
            <Button type="submit" isLoading={isLoading}>
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
