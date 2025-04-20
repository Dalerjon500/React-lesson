    // Imports remain the same
    import axios from "axios";
    import { useEffect, useState } from "react";
    import TodoList from "../component/TodoList";
    import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
    import apiClient from "../apiClient/ApiClient";
    import { FaArrowDown, FaCheckCircle, FaFilter, FaInfoCircle, FaRegCircle, FaTasks } from "react-icons/fa";
    import Loading from "../component/LoadingForUsers";
    import { User } from "./Posts";
    import { BiTask } from "react-icons/bi";

    export interface Todos {
        id: number;
        title: string;
        completed: boolean;
        userId: number
    }

    function Todos() {
        const [todos, setTodos] = useState<Todos[]>([]);
        const [limit, setLimit] = useState(10);
        const [currentFilter, setCurrentFilter] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const [users, setUsers] = useState<User[]>([]);
        const [currentUserId, setCurrentUserId] = useState<number | null>(null);

        useEffect(() => {
            fetchTodos();
            fetchUsers();
        }, [limit, currentFilter, currentUserId]);

        const fetchTodos = () => {
            setIsLoading(true);
            let url = `/todos?_limit=${limit}`;
            if (currentUserId) url += `&userId=${currentUserId}`;
            if (currentFilter) url += `&completed=${currentFilter}`;

            axios
                .get(apiClient.defaults.baseURL + url)
                .then((res) => setTodos(res.data))
                .catch(console.error)
                .finally(() => setIsLoading(false));
        };

        const fetchUsers = () => {
            axios.get<User[]>(apiClient.defaults.baseURL + `/users`)
                .then((res) => setUsers(res.data));
        };

        const handleUserClick = (userId: number | null) => {
            setCurrentUserId(userId === currentUserId ? null : userId);
            setLimit(10); // Reset on user switch
        };

        return (
            <div className="container p-4" style={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
                {isLoading && <Loading />}
                <div className="d-flex gap-4">
                    {/* Sidebar */}
                    <div style={{
                        width: "250px",
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "20px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                    }}>
                        <h4 className="d-flex align-items-center gap-2 text-primary mb-4">
                            <BiTask size={24} />
                            Tasks
                        </h4>
                        <div>
                            <div
                                onClick={() => handleUserClick(null)}
                                className={`mb-2 p-2 rounded cursor-pointer ${currentUserId === null ? 'bg-light text-primary' : ''}`}
                                style={{ cursor: "pointer" }}
                            >
                                 All Tasks
                            </div>
                            {users.map(user => (
                                <div
                                    key={user.id}
                                    onClick={() => handleUserClick(user.id)}
                                    className={`mb-2 p-2 rounded cursor-pointer ${user.id === currentUserId ? 'bg-light text-primary' : ''}`}
                                    style={{ cursor: "pointer" }}
                                >
                                     {user.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow-1">
                        <div className="bg-white rounded shadow-sm p-4 mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h3 className="text-primary d-flex align-items-center gap-3 m-0">
                                    <FaTasks />
                                    Task List
                                    <span className="badge bg-light text-primary">
                                        {todos.length} {todos.length === 1 ? "Task" : "Tasks"}
                                    </span>
                                </h3>

                                <FormControl size="small" sx={{ minWidth: 140 }}>
                                    <InputLabel>Items per load</InputLabel>
                                    <Select
                                        value={limit}
                                        label="Items per load"
                                        onChange={(e) => setLimit(Number(e.target.value))}
                                    >
                                        {[10, 20, 30, 40].map(num => (
                                            <MenuItem key={num} value={num}>Show {num}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="d-flex gap-2">
                                {[
                                    { label: "All", icon: <FaFilter />, filter: "" },
                                    { label: "Completed", icon: <FaCheckCircle className="text-success" />, filter: "true" },
                                    { label: "Uncompleted", icon: <FaRegCircle className="text-warning" />, filter: "false" },
                                ].map(({ label, icon, filter }) => (
                                    <button
                                        key={label}
                                        onClick={() => { setCurrentFilter(filter); setLimit(10); }}
                                        className={`btn ${currentFilter === filter ? "btn-primary text-white" : "btn-outline-secondary"} d-flex align-items-center gap-2`}
                                    >
                                        {icon} {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded shadow-sm p-4">
                            {!isLoading && <TodoList todos={todos} setTodos={setTodos} />}

                            <div className="text-center mt-4">
                                <button
                                    onClick={() => setLimit(limit + 10)}
                                    className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
                                >
                                    <FaArrowDown /> Load More Tasks
                                    <span className="badge bg-primary text-white ms-2">+10</span>
                                </button>

                                <div className="text-muted mt-3 d-flex align-items-center justify-content-center gap-2 small">
                                    <FaInfoCircle /> Showing {Math.min(limit, todos.length)} of {todos.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default Todos;
