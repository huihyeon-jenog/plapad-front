import { ReactNode } from 'react';

export default function GhostButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  const color = 'primary-color';

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-x-2 border border-transparent font-medium rounded-lg text-sm px-5 py-2 text-center text-${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
