import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const addTask = async (newTask) => {
    const response = await fetch(`${VITE_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const { success, message, task } = await response.json();

    if (!success) throw new Error(message);

    setTasks((prev) => [...prev, task]);
    return task;
  };

  const updateTask = async (updatedTask) => {
    const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const { success, message, task } = await response.json();

    if (!success) throw new Error(message);

    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    return task;
  };

  const deleteTask = async (taskId) => {
    const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });

    const { success, message } = await response.json();

    if (!success) throw new Error(message);

    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    return message;
  };

  return { tasks, addTask, updateTask, deleteTask };
}
