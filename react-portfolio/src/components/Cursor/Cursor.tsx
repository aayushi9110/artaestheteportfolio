import { useEffect, useState } from 'react';
import './Cursor.css';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [data-cursor]')) {
        setIsHovering(true);
        const label = target.getAttribute('data-cursor') || 'View';
        setText(label);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setText('');
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      <div
        id="cur"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '20px' : '10px',
          height: isHovering ? '20px' : '10px',
          background: isHovering ? 'var(--burnt)' : 'var(--terra)',
          borderRadius: isHovering ? '4px' : '50%',
        }}
      />
      <div
        id="cur-ring"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '60px' : '34px',
          height: isHovering ? '60px' : '34px',
        }}
      />
      {text && (
        <div
          id="cur-txt"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Cursor;
