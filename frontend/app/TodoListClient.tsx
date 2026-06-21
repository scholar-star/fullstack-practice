'use client';

import {useState} from "react";
import TodoList from "@/app/todos/TodoList";

export default function TodoListClient({initialTodos}: {initialTodos: any[]}) {
    const [todos, setTodos] = useState(initialTodos);

    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id)); // 갱신
    }

    const handleStatusChange = (updatedTodo: any) => {
        setTodos(todos.map(
            todo => todo.id === updatedTodo.id ? updatedTodo : todo
        ))
    }

    if (todos.length === 0) {
        return <p className="text-center text-gray-500">할 일이 없습니다.</p>;
    }

    return (
        <div className="p-6 max-w-xl mx-auto space-y-3">
            {todos.map((todo) => (
                <TodoList
                    key={todo.id}
                    todo={todo}
                    onDelete={handleDeleteTodo}
                    onStatusChange={handleStatusChange}
                />
            ))}
        </div>

    );
}