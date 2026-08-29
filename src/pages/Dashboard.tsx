export function Dashboard() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="h-32 rounded-lg bg-wl-surface shadow-sm border-l-4 border-wl-lime flex flex-col justify-center p-4">
          <span className="text-sm text-gray-400">Arquivos Analisados</span>
          <span className="text-2xl font-bold text-white mt-1">345</span>
        </div>
      </div>
    </main>
  );
}