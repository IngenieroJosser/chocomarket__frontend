interface HouseIconProps {
  width?: string;
  height?: string;
}

const HouseIcon: React.FC<React.SVGProps<HouseIconProps>> = ({width, height}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 -960 960 960"
    width={width}
    fill="#008060"
    className="m-2 cursor-pointer"
  >
    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
  </svg>
);

export default HouseIcon;
