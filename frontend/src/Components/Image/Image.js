import React from "react";
import { useSpring, animated } from "react-spring";
import "./Image.css";

// Helper functions for the card animation
const trans = (x, y, s) =>
  ` rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const calc = (x, y) => {
  const BUFFER = 50;
  const why = -(y - window.innerHeight / 2) / BUFFER;
  const ex = (x - window.innerWidth / 2) / BUFFER;

  return [-(y / 50), x / 50, 1.1];
};

// Card Component
const Image = ({ imageUrl }) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 2, tension: 1000, friction: 100 }
  }));

  return (
    <animated.div
      className="Home-card-image"
      onMouseMove={(e) => {
        const { clientX: x, clientY: y } = e;
        set({ xys: calc(x, y) });
      }}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        transform: props.xys.interpolate(trans),
        backgroundImage: `url(${imageUrl})` // Use the imageUrl prop
      }}
    />
  );
};

export default Image;
