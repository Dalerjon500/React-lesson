import React, { useState } from "react";

function App() {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Learn Javascript", completed: false },
        { id: 2, text: "Learn React", completed: false },
        { id: 3, text: "Build a React App", completed: false },
    ]);
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all");

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask("");
        }
    };

    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        console.log("salom")
        return true;
    });

    return (
        <div className="container mt-5">
            <div className="card mx-auto" style={{ maxWidth: "500px" }}>
                <div className="card-header text-center">
                    <h3>THINGS TO DO</h3>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add New"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" onClick={addTask}>
                                +
                            </button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {filteredTasks.map((task) => (
                            <li
                                key={task.id}
                                className={`list-group-item d-flex align-items-center ${
                                    task.completed
                                        ? "list-group-item-secondary text-decoration-line-through"
                                        : ""
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    className="mr-3"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                />
                                {task.text}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
          <span>
            {tasks.filter((task) => !task.completed).length} items left
          </span>
                    <div className="btn-group" role="group" aria-label="Filter tasks">
                        <button
                            type="button"
                            className={`btn btn-sm ${
                                filter === "all" ? "btn-primary" : "btn-outline-primary"
                            }`}
                            onClick={() => setFilter("all")}
                        >
                            All
                        </button>
                        <button
                            type="button"
                            className={`btn btn-sm ${
                                filter === "active" ? "btn-primary" : "btn-outline-primary"
                            }`}
                            onClick={() => setFilter("active")}
                        >
                            Active
                        </button>
                        <button
                            type="button"
                            className={`btn btn-sm ${
                                filter === "completed" ? "btn-primary" : "btn-outline-primary"
                            }`}
                            onClick={() => setFilter("completed")}
                        >
                            Completed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;