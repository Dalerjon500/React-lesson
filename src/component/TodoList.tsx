import { Todos } from "../page/Todos";
import { Badge, ListGroup } from "react-bootstrap";
import { DragEvent, useState } from "react";
import apiClient from "../apiClient/ApiClient";

interface Props {
    todos: Todos[];
    setTodos: (todos: Todos[]) => void;
}

function TodoList({ todos, setTodos }: Props) {
    const [hoveredTodo, setHoveredTodo] = useState<number | null>(null);
    const [draggedTodoId, setDraggedTodoId] = useState<number | null>(null);

    const changeTodoStatus = (todoId: number) => {
        apiClient.patch(`/todos/${todoId}`, { completed: !todos.find(todo => todo.id === todoId)?.completed })
            .then((res) => setTodos(todos.map(todo => todo.id === todoId ? res.data : todo)));
    };

    function handleDragStart(id: number) {
        setDraggedTodoId(id);
    }

    function handleDrop(ev: DragEvent<HTMLDivElement>, dropTarget: number) {
        ev.preventDefault();

        if (draggedTodoId === null) return;

        const draggedTodo = todos.find(t => t.id === draggedTodoId);
        if (!draggedTodo) return;

        const shouldBeCompleted = dropTarget === 1;

        if (draggedTodo.completed !== shouldBeCompleted) {
            const updatedTodo = { ...draggedTodo, completed: shouldBeCompleted };
            apiClient.patch(`/todos/${draggedTodo.id}`, updatedTodo)
                .then((res) => setTodos(todos.map(t => t.id === draggedTodo.id ? res.data : t)));
        }

        setDraggedTodoId(null);
    }

    return (
        <div className="mt-3" style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '20px' }}>
            <div className="todo-container d-flex justify-content-between gap-3">
                {/* Pending Tasks Column */}
                <div
                    className="pending w-50"
                    style={{
                        borderRight: '2px solid #3a3a3a',
                        paddingRight: '1.5rem'
                    }}
                    onDragOver={ev => ev.preventDefault()}
                    onDrop={e => handleDrop(e, 0)}
                >
                    <h5 className="mb-4" style={{
                        color: '#6e45e2',
                        fontWeight: '600',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <span style={{ color: '#6e45e2' }}>⏳</span> Pending Tasks
                    </h5>
                    <ListGroup variant="flush" className="mb-4">
                        {todos.filter(todo => !todo.completed).map(todo => (
                            <ListGroup.Item
                                draggable
                                key={todo.id}
                                id={`todo-${todo.id}`}
                                className={`mb-3 p-3 rounded pending-item`}
                                style={{
                                    height: '90px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    borderLeft: `4px solid #6e45e2`,
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                    cursor: 'grab',
                                    transform: hoveredTodo === todo.id ? 'translateX(5px)' : 'none',
                                    backgroundColor: hoveredTodo === todo.id ? '#252525' : '#1e1e1e',
                                    border: '1px solid #333',
                                    opacity: draggedTodoId === todo.id ? 0.5 : 1
                                }}
                                onClick={() => changeTodoStatus(todo.id)}
                                onMouseEnter={() => setHoveredTodo(todo.id)}
                                onMouseLeave={() => setHoveredTodo(null)}
                                onDragStart={() => handleDragStart(todo.id)}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div style={{
                                        flex: 1,
                                        color: '#e0e0e0',
                                        fontSize: '1.1rem',
                                        fontWeight: '500'
                                    }}>
                                        {todo.title}
                                    </div>
                                    <Badge
                                        pill
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            changeTodoStatus(todo.id);
                                        }}
                                        className="ms-3"
                                        style={{
                                            backgroundColor: 'rgba(110, 69, 226, 0.2)',
                                            color: '#b399ff',
                                            fontSize: '0.85rem',
                                            padding: '8px 12px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            transform: hoveredTodo === todo.id ? 'scale(1.05)' : 'none',
                                            border: '1px solid rgba(110, 69, 226, 0.4)'
                                        }}
                                    >
                                        <span>⏳ Pending</span>
                                    </Badge>
                                </div>
                                <div className="mt-2" style={{
                                    fontSize: '0.8rem',
                                    color: '#7a7a7a'
                                }}>
                                    ID: {todo.id}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>

                {/* Completed Tasks Column */}
                <div
                    className="completed w-50"
                    onDragOver={ev => ev.preventDefault()}
                    onDrop={e => handleDrop(e, 1)}
                >
                    <h5 className="mb-4" style={{
                        color: '#88d3ce',
                        fontWeight: '600',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <span style={{ color: '#88d3ce' }}>✓</span> Completed Tasks
                    </h5>
                    <ListGroup variant="flush">
                        {todos.filter(todo => todo.completed).map(todo => (
                            <ListGroup.Item
                                onDragStart={() => handleDragStart(todo.id)}
                                draggable
                                key={todo.id}
                                id={`todo-${todo.id}`}
                                className={`mb-3 p-3 rounded completed-item`}
                                style={{
                                    height: '90px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    borderLeft: `4px solid #88d3ce`,
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                    cursor: 'grab',
                                    transform: hoveredTodo === todo.id ? 'translateX(5px)' : 'none',
                                    backgroundColor: hoveredTodo === todo.id ? '#252525' : '#1e1e1e',
                                    border: '1px solid #333',
                                    opacity: draggedTodoId === todo.id ? 0.5 : 0.8
                                }}
                                onClick={() => changeTodoStatus(todo.id)}
                                onMouseEnter={() => setHoveredTodo(todo.id)}
                                onMouseLeave={() => setHoveredTodo(null)}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div style={{
                                        flex: 1,
                                        textDecoration: 'line-through',
                                        color: '#7a7a7a',
                                        fontSize: '1.1rem',
                                        fontWeight: '500'
                                    }}>
                                        {todo.title}
                                    </div>
                                    <Badge
                                        pill
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            changeTodoStatus(todo.id);
                                        }}
                                        className="ms-3"
                                        style={{
                                            backgroundColor: 'rgba(136, 211, 206, 0.2)',
                                            color: '#88d3ce',
                                            fontSize: '0.85rem',
                                            padding: '8px 12px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            transform: hoveredTodo === todo.id ? 'scale(1.05)' : 'none',
                                            border: '1px solid rgba(136, 211, 206, 0.4)'
                                        }}
                                    >
                                        <span>✓ Completed</span>
                                    </Badge>
                                </div>
                                <div className="mt-2" style={{
                                    fontSize: '0.8rem',
                                    color: '#5a5a5a'
                                }}>
                                    ID: {todo.id}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </div>
        </div>
    );
}

export default TodoList;