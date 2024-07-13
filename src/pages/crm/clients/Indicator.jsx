import React from 'react';
import './index.css';

export default function Indicator({ 
  green = 10,
  red = 5,
  gray = 4
}) {
  const tottal = green + red + gray;
  const containerRef = React.useRef(null);
  const [chipWidth, setChipWidth] = React.useState('auto');

  React.useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const maxChipWidth = Math.min(30, Math.max(4, containerWidth / tottal));
      setChipWidth(`${maxChipWidth}px`);
    }
  }, [tottal]);

  return (
    <div ref={containerRef} className="indicator-container">
      {Array.from({ length: tottal }).map((_, index) => {
        let bgColor = "bg-gray-indicator"; // Предполагаемый цвет для "grey"
        if (index < green) {
          bgColor = "bg-green-indicator"; // Зеленый для первых 'green' элементов
        } else if (index >= green && index < green + red) {
          bgColor = "bg-red-text"; // Красный для следующих 'red' элементов
        }
        return (
          <div
            key={index}
            style={{ minWidth: '4px', maxWidth: '30px', width: chipWidth }}
            className={`indicator-chip ${bgColor}`}
          ></div>
        );
      })}
    </div>
  );
}