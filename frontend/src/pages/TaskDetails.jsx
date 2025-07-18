
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskDetails() {
    const { id } = useParams();
    const { tasks } = useContext(GlobalContext);
    const task = tasks.find((t) => t.id === parseInt(id));

    if (!task) {
        return (
            <div className="task-not-found">
                <h2>Task not found</h2>
            </div>
        );
    }

    const handleDelete = () => {
        console.log(`Deleting task with ID: ${task.id}`);
        // Qui verrà implementata la logica di eliminazione
    }

    return (
        <div className="task-details-container">
            <div className="task-details">
                <h1>Dettaglio Task</h1>

                <div className="task-detail-item">
                    <p><strong>Nome:</strong> {task.title}</p>
                </div>

                <div className="task-detail-item">
                    <p><strong>Descrizione:</strong> {task.description}</p>
                </div>

                <div className="task-detail-item">
                    <p><strong>Stato:</strong> {task.status}</p>
                </div>

                <div className="task-detail-item">
                    <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="task-actions">
                    <button onClick={() => handleDelete(task.id)} className="btn-danger">
                        Elimina Task
                    </button>
                </div>
            </div>
        </div>
    );
}