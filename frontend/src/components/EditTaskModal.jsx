import { useState, useRef } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
    const editFormRef = useRef();
    const [editedTask, setEditedTask] = useState(task);

    const changeEditedTask = (key, event) => {
        setEditedTask((prev) => ({
            ...prev,
            [key]: event.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedTask);
        onClose();
    };

    return (
        <Modal
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <label>
                        Nome Task:
                        <input
                            type="text"
                            value={editedTask.title}
                            onChange={(e) => changeEditedTask("title", e)}
                        />
                    </label>
                    <label>
                        Descrizione:
                        <textarea
                            value={editedTask.description}
                            onChange={(e) => changeEditedTask("description", e)}
                        />
                    </label>
                    <label>
                        Stato:
                        <select
                            value={editedTask.status}
                            onChange={(e) => changeEditedTask("status", e)}
                        >
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>
                </form>
            }
            confirmText="Salva"
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    );
}