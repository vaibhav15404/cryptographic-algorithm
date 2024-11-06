import React from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import "./FileImageCard.css"; // Separate CSS file for styling

// Helper functions for the card animation
const trans = (x, y, s) =>
  `rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const calc = (x, y) => {
  const BUFFER = 50;
  const why = -(y - window.innerHeight / 2) / BUFFER;
  const ex = (x - window.innerWidth / 2) / BUFFER;

  return [-(y / 50), x / 50, 1.1]; // Adjusting tilt and scale
};

const FileImageCard = ({ title, description, route, imageSrc }) => {
  const navigate = useNavigate();
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 2, tension: 1000, friction: 100 },
  }));

  const handleClick = () => {
    navigate(route); // Navigate to the given route
  };

  return (
    <animated.div
      className="file-image-card"
      style={{
        backgroundImage: `url(${imageSrc})`,
        transform: props.xys.interpolate(trans),
      }}
      onMouseMove={(e) => {
        const { clientX: x, clientY: y } = e;
        set({ xys: calc(x, y) });
      }}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      onClick={handleClick}
    >
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </animated.div>
  );
};

export default FileImageCard;
