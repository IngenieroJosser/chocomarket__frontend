type AlertProps = {
  type?: 'success' | 'error' | 'info';
  message: string;
};

export const Alert = ({ type = 'info', message }: AlertProps) => {
  const base = 'p-3 rounded text-sm font-medium';
  const types = {
    success: 'bg-[#d1fae5] text-[#065f46]',
    error: 'bg-red-100 text-red-700',
    info: 'bg-[#F7F7F7] text-[#008060] border border-[#008060]',
  };

  return <div className={`${base} ${types[type]}`}>{message}</div>;
};
