import React, { useState, useEffect } from "react";

const Timer = ({ userId }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const storageKey = `timer_${userId}`;

  // Load stored data on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(storageKey));
    if (storedData) {
      setTime(storedData.time || 0);
      setIsRunning(storedData.isRunning || false);
    }
  }, [storageKey]);

  // Timer interval
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 1;

          // Save progress in localStorage
          localStorage.setItem(
            storageKey,
            JSON.stringify({ time: newTime, isRunning: true })
          );

          // Reset at midnight
          const now = new Date();
          if (
            now.getHours() === 0 &&
            now.getMinutes() === 0 &&
            now.getSeconds() === 0
          ) {
            clearInterval(interval);
            setTime(0);
            setIsRunning(false);
            localStorage.setItem(
              storageKey,
              JSON.stringify({ time: 0, isRunning: false })
            );
          }

          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, storageKey]);

  // ✅ Check-in
  const handleCheckIn = () => {
    if (!isRunning) {
      setIsRunning(true);
      localStorage.setItem(
        storageKey,
        JSON.stringify({ time, isRunning: true })
      );
    }
  };

  // ✅ Check-out (pause but keep time saved)
  const handleCheckOut = () => {
    setIsRunning(false);
    localStorage.setItem(
      storageKey,
      JSON.stringify({ time, isRunning: false })
    );
  };

  // Format HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs} : ${mins} : ${secs}`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "20px", marginBottom: "10px" }}>
        {formatTime(time)}
      </div>

      {isRunning ? (
        <button
          style={{
            border: "1px solid red",
            background: "transparent",
            color: "red",
            padding: "5px 15px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onClick={handleCheckOut}
        >
          Check-out
        </button>
      ) : (
        <button
          style={{
            border: "1px solid green",
            background: "transparent",
            color: "green",
            padding: "5px 15px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onClick={handleCheckIn}
        >
          Check-in
        </button>
      )}
    </div>
  );
};

export default Timer;

