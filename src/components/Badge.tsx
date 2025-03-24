type BadgeProps = {
  text: string;
  color?: 'green' | 'gray' | 'red';
};

export const Badge = ({ text, color = 'green' }: BadgeProps) => {
  const colors = {
    green: 'bg-[#008060] text-white',
    gray: 'bg-gray-300 text-gray-800',
    red: 'bg-red-500 text-white',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${colors[color]}`}>
      {text}
    </span>
  );
};
