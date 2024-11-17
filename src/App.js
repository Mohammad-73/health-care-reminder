import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [eyeReminderTime, setEyeReminderTime] = useState(7 * 60); // 7 minutes in seconds
  const [walkReminderTime, setWalkReminderTime] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    let eyeReminderInterval;
    let walkReminderInterval;

    if (isRunning) {
      eyeReminderInterval = setInterval(() => {
        setEyeReminderTime((prevTime) => prevTime - 1);
      }, 1000); // 1 second

      walkReminderInterval = setInterval(() => {
        setWalkReminderTime((prevTime) => prevTime - 1);
      }, 1000); // 1 second
    }

    return () => {
      clearInterval(eyeReminderInterval);
      clearInterval(walkReminderInterval);
    };
  }, [isRunning]);

  useEffect(() => {
    if (eyeReminderTime <= 0) {
      showNotification(
        "Close Your Eyes",
        "Take a break and close your eyes for a few seconds."
      );
      setEyeReminderTime(7 * 60); // Reset to 7 minutes
    }
  }, [eyeReminderTime]);

  useEffect(() => {
    if (walkReminderTime <= 0) {
      showNotification(
        "Stand Up and Walk",
        "It's time to stand up and walk around for a bit."
      );
      setWalkReminderTime(30 * 60); // Reset to 30 minutes
    }
  }, [walkReminderTime]);

  const showNotification = (title, body) => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  };

  const toggleReminders = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setEyeReminderTime(7 * 60); // Reset to 7 minutes
      setWalkReminderTime(30 * 60); // Reset to 30 minutes
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="App">
      <button onClick={toggleReminders} className="toggle-button">
        {isRunning ? "Stop Reminders" : "Start Reminders"}
      </button>
      {isRunning && (
        <div className="timers">
          <div className="timer">
            <span>Next Eye Reminder:</span>
            <span>{formatTime(eyeReminderTime)}</span>
          </div>
          <div className="timer">
            <span>Next Walk Reminder:</span>
            <span>{formatTime(walkReminderTime)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
