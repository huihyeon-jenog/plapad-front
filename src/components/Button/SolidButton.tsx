import { ReactNode } from 'react';

export default function SolidButton({
  children,
  disabled,
  htmlType,
  width = '120px',
}: {
  children: ReactNode;
  disabled: boolean;
  htmlType: 'button' | 'submit';
  buttonType?: string;
  width?: string;
}) {
  const color = 'primary-color';

  return (
    <button
      type={htmlType}
      className={`flex w-[${width}] justify-center items-center text-white bg-${color} hover:brightness-90 focus:ring-1 focus:outline-none focus:ring-${color} font-medium rounded-lg text-sm px-5 py-2 text-center`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
