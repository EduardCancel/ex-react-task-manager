import { createContext } from "react";
import useTasks from "../Hooks/useTasks";


export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    const taskData = useTasks();
    return (
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    );
}