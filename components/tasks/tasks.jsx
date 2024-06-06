import React, { useState, useEffect } from "react";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const saveTasks = async (updatedTasks) => {
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTasks),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask("");
      await saveTasks(updatedTasks);
    }
  };

  const toggleTaskCompletion = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const deleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>רשימת משימות</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="הוסף משימה חדשה"
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          הוסף
        </button>
      </form>
      <ul className={styles.taskList}>
        {tasks.map((task, index) => (
          <li key={index} className={styles.taskItem}>
            <span
              className={`${styles.taskText} ${
                task.completed ? styles.completed : ""
              }`}
            >
              {task.text}
            </span>
            <div className={styles.taskActions}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                className={styles.checkbox}
              />
              <button
                onClick={() => deleteTask(index)}
                className={styles.deleteButton}
              >
                מחק
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
