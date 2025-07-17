import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';


export default function TaskList() {

    const { tasks } = useContext(GlobalContext);
    console.log('tasks:', tasks);

    return (
        <div>
            <h1>Task List</h1>
            {/* Render the list of tasks here */}
        </div>
    );
}
