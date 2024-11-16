import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let eyeReminderInterval;
    let walkReminderInterval;

    if (isRunning) {
      eyeReminderInterval = setInterval(() => {
        showNotification(
          "Close Your Eyes",
          "Take a break and close your eyes for a few seconds."
        );
      }, 10 * 60 * 1000); // 10 minutes

      walkReminderInterval = setInterval(() => {
        showNotification(
          "Stand Up and Walk",
          "It's time to stand up and walk around for a bit."
        );
      }, 30 * 60 * 1000); // 30 minutes
    }

    return () => {
      clearInterval(eyeReminderInterval);
      clearInterval(walkReminderInterval);
    };
  }, [isRunning]);

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
  };

  return (
    <div className="App">
      <button onClick={toggleReminders} className="toggle-button">
        {isRunning ? "Stop Reminders" : "Start Reminders"}
      </button>
    </div>
  );
}

export default App;
