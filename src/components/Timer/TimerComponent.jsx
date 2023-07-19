import React, { useEffect, useState } from 'react';

/**
 * TimerComponent is a countdown timer component.
 *
 * @param {number} time - The initial time in seconds.
 */
const TimerComponent = ({ time }) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    let interval = null;
    if (seconds > 0) {
      // Start the timer interval if there are remaining seconds
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    // Clean up the interval when the component unmounts or seconds change
    return () => clearInterval(interval);
  }, [seconds]);

  /**
   * Formats the time into MM:SS format.
   *
   * @param {number} time - The time in seconds.
   * @returns {string} The formatted time as MM:SS.
   */
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center">
        {/* Display the formatted time */}
        <div className="bg-primary rounded-md p-2 mx-1">
          <span className="text-2xl font-bold text-primary-light">{formatTime(seconds)}</span>
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;
