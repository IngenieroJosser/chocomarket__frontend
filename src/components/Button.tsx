import React from 'react';

type BotonProps = {
  text: string;
  onClick: () => void;
};

export const Button: React.FC<BotonProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-[#008060] text-white rounded">
      {text}
    </button>
  );
};

export default Button;
