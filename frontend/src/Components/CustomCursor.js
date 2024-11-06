// src/components/CustomCursor.js
import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // For delayed movement

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animateCursor = () => {
      setCursorPosition((prevPosition) => {
        const diffX = position.x - prevPosition.x;
        const diffY = position.y - prevPosition.y;
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        // Stop movement if the cursor is very close to the target
        if (distance < 1) {
          return prevPosition;
        }

        // Smooth delayed movement
        return {
          x: prevPosition.x + diffX * 0.7,
          y: prevPosition.y + diffY * 0.7,
        };
      });

      requestAnimationFrame(animateCursor);
    };

    requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [position]);

  return (
    <div
      className="custom-cursor"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
      }}
    />
  );
};

export default CustomCursor;
