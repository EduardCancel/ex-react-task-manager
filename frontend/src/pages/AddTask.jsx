import { useState, useRef, useMemo, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";


const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
    const { addTask } = useContext(GlobalContext);

    const [taskTitle, setTaskTitle] = useState("");
    const descriptionRef = useRef();
    const statusRef = useRef();

    const taskNameError = useMemo(() => {
        if (!taskTitle.trim())
            return "Il nome del task non può essere vuoto.";

        if ([...taskTitle].some(char => symbols.includes(char)))
            return "Il nome del task non può contenere caratteri speciali.";
        return "";

    }, [taskTitle]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (taskNameError)
            return;

        const newTask = {
            title: taskTitle.trim(),
            description: descriptionRef.current.value || "",
            status: statusRef.current.value || "To do"
        }
        console.log("New Task:", newTask);


        try {
            await addTask(newTask);
            setTaskTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "To do";
        } catch (error) {
            alert("Errore durante l'aggiunta del task: " + error.message);
        }
    }


    return (
        <div className="form-container">
            <div className="form-header">
                <h1>Add Task</h1>
                <p>Crea un nuovo task per la tua lista</p>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Nome Task */}
                <div className="form-group">
                    <label>
                        Nome Task:
                        <input
                            type="text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            placeholder="Inserisci il nome del task..."
                        />
                    </label>
                    {taskNameError && <span className="error-message">{taskNameError}</span>}
                </div>

                {/* Descrizione */}
                <div className="form-group">
                    <label>
                        Descrizione:
                        <textarea
                            ref={descriptionRef}
                            placeholder="Inserisci una descrizione del task..."
                        />
                    </label>
                </div>

                {/* Stato */}
                <div className="form-group">
                    <label>
                        Stato:
                        <select ref={statusRef} defaultValue="To do">
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>
                </div>

                {/* Pulsante di invio */}
                <div className="form-group">
                    <button type="submit" disabled={taskNameError}>
                        Aggiungi Task
                    </button>
                </div>
            </form>
        </div>
    );
}