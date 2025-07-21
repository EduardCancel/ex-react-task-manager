import { useContext, useState, useMemo, useCallback } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import TaskRow from '../components/TaskRow';

// Funzione di debounce generica
const debounce = (callback, delay) => {
    let timer;

    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
};

export default function TaskList() {

    const { tasks } = useContext(GlobalContext);
    console.log('tasks:', tasks);

    const [searchQuery, setSearchQuery] = useState("");
    const [inputValue, setInputValue] = useState("");
    const debounceSearch = useCallback(debounce(setSearchQuery, 500), []);

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

    const filteredAndSortedTasks = useMemo(() => {
        return [...tasks].filter(task => {
            return task.title.toLowerCase().includes(searchQuery.toLowerCase());
        }).sort((a, b) => {
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
    }, [tasks, sortBy, sortOrder, searchQuery]);

    return (
        <div>
            <h1>Lista Della Task</h1>
            {/* Input di ricerca */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Cerca task..."
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        debounceSearch(e.target.value);
                    }}
                />
            </div>
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
                    {filteredAndSortedTasks.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
