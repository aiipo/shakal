import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import EVENT_TYPES from '../../constants/event-types';
import './result-preview.scss';

const ResultPreview = React.forwardRef(({ elements, clear }, parentRef) => {
  const containerRef = useRef(null);

  const handleClick = ({ target }) => {
    if (!containerRef.current.contains(target)) {
      clear();
    }
  };

  useEffect(() => {
    const handleKeyUp = ({ key }) => {
      if (key === EVENT_TYPES.ESC) {
        clear();
      }
    };

    window.addEventListener('keyup', handleKeyUp, false);

    return () => {
      window.removeEventListener('keyup', handleKeyUp, false);
    };
  }, []);

  return (elements?.length > 0 && parentRef?.current && createPortal((
    <div className="result" onClick={handleClick}>
      <ul className='result__container' ref={containerRef}>
        <div className="result__header">
          <span className='result__close' onClick={clear} tabIndex='1'>x</span>
        </div>
        {elements?.map(({ accuracy, person }, ind) => (
          <li key={ind} className='result__element'>
            <span className='result__person'>
              <small>{ind + 1}</small>. {person}
            </span>
            <span className='result__accuracy'>{accuracy}%</span>
          </li>
        ))}
      </ul>
    </div>
  ), parentRef.current)) ?? null;
});

export default ResultPreview;
