import React, { useEffect, useState } from 'react';

const TimerComponent = ({ time }) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    let interval = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center">
        <div className="bg-primary rounded-md p-2 mx-1">
          <span className="text-2xl font-bold text-primary-light">{formatTime(seconds)}</span>
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;
