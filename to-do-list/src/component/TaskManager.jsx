import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";

export default function TaskManager({
  currentUser,
  setCurrentUser,
  theme,
  toggleTheme
}) {
  const [tasks, setTasks] = useState(currentUser.tasks || []);
  const [showForm, setShowForm] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);

  useEffect(() => {
    setCurrentUser(prev => {
      const updatedUser = { ...prev, tasks };

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const idx = users.findIndex(u => u.email === prev.email);
      if (idx > -1) users[idx] = updatedUser;

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      return updatedUser;
    });
  }, [tasks, setCurrentUser]);

  const addTask = (task) => {
    if (editTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editTaskIndex] = task;
      setTasks(updatedTasks);
      setEditTaskIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
    setShowForm(false);
  };

  const editTask = (index) => {
    setEditTaskIndex(index);
    setShowForm(true);
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <div className={`task-manager ${theme}`}>
      
      {/* ✅ HEADER */}
      <div className="header">
        <h2>To-Do-List</h2>
        <div>
          <button onClick={toggleTheme}>
            {theme === "dark" ? "☀ Light" : "🌙 Dark"}
          </button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <h3>Pending Tasks</h3>
      <ul>
        {tasks.map((task, index) => (
          !task.completed && (
            <li key={index}>
              <strong>{task.title}</strong>
              <p>{task.desc}</p>
              <button onClick={() => editTask(index)}>📝</button>
              <button onClick={() => completeTask(index)}>✅</button>
              <button onClick={() => deleteTask(index)}>❌</button>
            </li>
          )
        ))}
      </ul>

      <h3>Completed Tasks</h3>
      <ul>
        {tasks.map((task, index) => (
          task.completed && (
            <li key={index}>
              <strong>{task.title}</strong>
              <p>{task.desc}</p>
              <button onClick={() => editTask(index)}>📝</button>
              <button onClick={() => deleteTask(index)}>❌</button>
            </li>
          )
        ))}
      </ul>

      <button onClick={() => setShowForm(true)}>+ Add Task</button>

      {showForm && (
        <TaskForm
          addTask={addTask}
          cancel={() => {
            setShowForm(false);
            setEditTaskIndex(null);
          }}
          editTask={editTaskIndex !== null ? tasks[editTaskIndex] : null}
          theme={theme}
        />
      )}
    </div>
  );
}
