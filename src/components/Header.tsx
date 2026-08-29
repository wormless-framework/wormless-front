import { DarkThemeToggle } from 'flowbite-react';
import iconWormless from '../assets/iconWormless.png';

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-wl-surface">
      <div className="flex items-center gap-3">
        <img 
          src={iconWormless} 
          alt="Logo Wormless" 
          className="w-8 h-8 mix-blend-screen" 
        />
        <span className="font-bold text-xl text-wl-lime uppercase tracking-wider">
          Wormless
        </span>
      </div>
      <DarkThemeToggle />
    </header>
  );
}