import { HiChartPie } from 'react-icons/hi';
import { BiUpload } from 'react-icons/bi';
import { Link } from 'react-router-dom'; 

export function Sidebar() {
  return (
    <div className="w-64 bg-wl-surface p-4 hidden md:block">
      <h2 className="text-xl font-bold text-white mb-6 px-2">
        Menu
      </h2>
      <ul className="space-y-2 text-sm font-medium text-gray-300">
        <li>
          <Link 
            to="/upload" 
            className="px-3 py-2 hover:bg-wl-surface-hover hover:text-wl-lime rounded-lg flex items-center gap-3 transition-colors"
          >
            <BiUpload className="w-5 h-5" />
            Upload
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard" 
            className="px-3 py-2 hover:bg-wl-surface-hover hover:text-wl-lime rounded-lg flex items-center gap-3 transition-colors"
          >
            <HiChartPie className="w-5 h-5" />
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}