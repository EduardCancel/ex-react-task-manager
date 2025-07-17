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

  const addTask = (newTask) => {
    // Effetuare le operazioni necessarie per aggiungere un task
  };

  const updateTask = (updatedTask) => {
    // Effettuare le operazioni necessarie per aggiornare un task
  };

  const deleteTask = (taskId) => {
    // Effettuare le operazioni necessarie per eliminare un task
  };

  return { tasks, addTask, updateTask, deleteTask };
}
