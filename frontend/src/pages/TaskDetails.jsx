
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, deleteTask, updateTask } = useContext(GlobalContext);
    const task = tasks.find((t) => t.id === parseInt(id));

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    if (!task) {
        return (
            <div className="task-not-found">
                <h2>Task not found</h2>
            </div>
        );
    }

    const handleDelete = async () => {
        console.log(`Deleting task with ID: ${task.id}`);
        try {
            await deleteTask(task.id);
            alert("Task eliminata con successo!");
            navigate("/");
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    const handleUpdate = async (updatedTask) => {
        console.log("Updating task:", updatedTask);
        try {
            await updateTask(updatedTask);
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating task:", error);

        }
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
                    <button onClick={() => setShowDeleteModal(true)} className="btn-danger">
                        Elimina Task
                    </button>
                </div>
                <div className="task-actions">
                    <button onClick={() => setShowEditModal(true)} className="btn-primary">
                        Modifica Task
                    </button>
                </div>
                <Modal
                    title="Conferma Eliminazione"
                    content={`Sei sicuro di voler eliminare il task "${task.title}"?`}
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                    confirmText="Elimina"
                />

                {/* Modale di modifica */}
                <EditTaskModal
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    task={task}
                    onSave={handleUpdate}
                />
            </div>
        </div>
    );
}