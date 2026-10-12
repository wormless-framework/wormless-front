interface SeverityBadgeProps {
  severity: string;
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const isHighOrCritical = severity === 'ALTA' || severity === 'CRITICA';

  return (
    <div className={`px-4 py-2 text-xl font-bold font-orbitron uppercase border-2 ${
      isHighOrCritical
        ? 'border-red-500 text-red-500 shadow-[4px_4px_0_0_#ef4444]'
        : 'border-wl-lime text-wl-lime shadow-[4px_4px_0_0_var(--color-wl-lime-dark)]'
    }`}>
      Risco: {severity}
    </div>
  );
}