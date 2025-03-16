import { ReactNode } from 'react';

export default function OutlineButton({
  children,
  disabled,
  htmlType,
  width = '120px',
  onClick,
}: {
  children: ReactNode;
  htmlType: 'button' | 'submit';
  disabled?: boolean;
  buttonType?: string;
  width?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type={htmlType}
      className={`w-[${width}] border border-gray-300 hover:brightness-90 focus:ring-1 focus:outline-none focus:ring-primary-color font-medium rounded-lg text-sm px-5 py-2 text-center`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
