

import React from 'react';
import { useSpring, animated } from 'react-spring';
import './Card.css';

// Helper functions for the card animation
const trans = (x, y, s) =>
  `rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const calc = (x, y) => {
  const BUFFER = 50;
  const why = -(y - window.innerHeight / 2) / BUFFER;
  const ex = (x - window.innerWidth / 2) / BUFFER;

  return [-(y / 50), x / 50, 1.1]; // Adjusting tilt and scale
};

const Card = ({ backgroundImage, title, description, linkUrl, linkText }) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 2, tension: 1000, friction: 100 }
  }));

  const handleCardClick = () => {
    window.open(linkUrl, '_blank');
  };

  return (
    <animated.div
      className="card"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        transform: props.xys.interpolate(trans),
      }}
      onMouseMove={(e) => {
        const { clientX: x, clientY: y } = e;
        set({ xys: calc(x, y) });
      }}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      onClick={handleCardClick}
    >
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      </div>
    </animated.div>
  );
};

export default Card;

