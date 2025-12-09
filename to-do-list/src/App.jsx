import React, { useState, useEffect } from "react";
import Auth from "./component/Auth";
import TaskManager from "./component/TaskManager";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedUser) setCurrentUser(loggedUser);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      {!currentUser ? (
        <Auth setCurrentUser={setCurrentUser} />
      ) : (
        <TaskManager
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
    </div>
  );
}
