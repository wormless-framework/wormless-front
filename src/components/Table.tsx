import type { ReactNode } from 'react';

// Define a estrutura de uma coluna genérica
export interface Column<T> {
  header: string | ReactNode;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string; // Para controlar larguras e alinhamentos do cabeçalho
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
  emptyMessage?: string | ReactNode;
}

export function Table<T>({ 
  data, 
  columns, 
  keyExtractor, 
  emptyMessage = "Nenhum registo encontrado." 
}: TableProps<T>) {
  
  if (data.length === 0) {
    return <p className="text-gray-400 italic font-mono text-sm">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-300 font-mono">
        <thead className="text-xs text-wl-lime uppercase bg-[#0a0a0a] border-b border-gray-700">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className={`px-4 py-4 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={keyExtractor(row)} className="border-b border-gray-800 hover:bg-[#0f0f0f] transition-colors">
              {columns.map((col, index) => (
                <td key={index} className="px-4 py-5 align-top">
                  {/* Se o accessor for uma função, executa a função. Se for uma string, busca o valor direto */}
                  {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}