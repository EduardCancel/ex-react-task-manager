import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Tasklist from './pages/TaskList';
import AddTask from './pages/AddTask';
import { GlobalProvider } from './context/GlobalContext';
import './index.css';

function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>

        <nav>
          < NavLink to="/">Task List</NavLink>
          < NavLink to="/add">Add Task</NavLink>
        </nav>

        <Routes>
          < Route path="/" element={< Tasklist />} />
          < Route path="/add" element={< AddTask />} />
        </Routes>

      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App
