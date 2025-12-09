import React, { useState, useEffect } from "react";

export default function TaskForm({ addTask, cancel, editTask, theme }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDesc(editTask.desc);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ 
      title, 
      desc, 
      completed: editTask ? editTask.completed : false 
    });
    setTitle("");
    setDesc("");
  };

  return (
    <div className={`task-form-container ${theme}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Task Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
        ></textarea>

        <button type="submit">Save Task</button>
        <button type="button" onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
}
