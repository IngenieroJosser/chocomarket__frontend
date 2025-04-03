type InputProps = {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
};

export const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  name,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-[#008060]">{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#008060] text-black bg-white"
      />
    </div>
  );
};
