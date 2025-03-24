'use client'

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
};

export const Select = ({ label, name, value, onChange, options }: SelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-[#008060]">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="text-emerald-900 border-none text-sm rounded px-3 py-2 focus:outline-none focus:ring-2 "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
