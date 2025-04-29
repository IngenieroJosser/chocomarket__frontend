import React from 'react';

type BotonImgProps = {
  onClick: () => void;
  imageSrc?: string;
  imageAlt?: string;
};

export const ButtonImg: React.FC<BotonImgProps> = ({ onClick, imageSrc, imageAlt }) => {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-[#008060] text-white rounded">
      {imageSrc && <img src={imageSrc} alt={imageAlt || 'icon'} className="w-5 h-5" />}
    </button>
  );
};

export default ButtonImg;
