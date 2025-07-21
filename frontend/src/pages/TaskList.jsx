import { useContext, useState, useMemo } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';

export default function TaskList() {

    const { tasks } = useContext(GlobalContext);
    console.log('tasks:', tasks);

    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    const sorticon = sortOrder === 1 ? '↓' : '↑';

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    };

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            let comparison;
            if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title);
            } else if (sortBy === 'status') {
                const statusOptions = ["To do", "Doing", "Done"];
                comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status);
            } else if (sortBy === 'createdAt') {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                comparison = dateA - dateB;
            }
            return sortOrder * comparison;
        });
    }, [tasks, sortBy, sortOrder]);

    return (
        <div>
            <h1>Lista Della Task</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}>
                            Nome {sortBy === 'title' && sorticon}
                        </th>
                        <th onClick={() => handleSort('status')}>
                            Status {sortBy === 'status' && sorticon}
                        </th>
                        <th onClick={() => handleSort('createdAt')}>
                            Data di Creazione {sortBy === 'createdAt' && sorticon}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
