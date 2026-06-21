"use client";

import Link from "next/dist/client/link";

interface TodoItemProps {
    todo: {
        id: number;
        content: string;
        status: boolean;
    },
    onDelete: (id: number) => void; // 삭제 시, 부모에게 보고.
    onStatusChange: (todo: any) => void; // 상태 변경 시, 부모에게 보고.
}

export default function TodoList({ todo, onDelete, onStatusChange }: TodoItemProps) {

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/todos/${todo.id}`, {
                method: 'DELETE'
            })

            if(response.ok) {
                onDelete(todo.id); // 부모에게 삭제 보고 -> id Todo 삭제
            } 
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    const handleStatusChange = async (todo: any, checked: boolean) => {
        const updateTodo = {...todo, status: checked};

        try {
            const response = await fetch(`/api/todos/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: todo.content, status: checked })
            });
            if (response.ok) {
                onStatusChange(updateTodo); // 부모에게 상태 변경 보고 -> id Todo 상태 변경
            }
        } catch (error) {
            console.error('Error updating todo status:', error);
        }
    }

    return (
        <div className="flex items-center justify-between p-4 border bg-white border-blue-500 text-black rounded-lg">
            <label>
            <input type="checkbox"
            className = "sr-only peer"
            checked={todo.status} 
            onChange={(e) => handleStatusChange(todo, e.target.checked)}
            />
            <div className="flex items-center max-w-md justify-center relative w-6 h-6 bg-white border border-blue-900 rounded-full peer-checked:bg-blue-900 peer-checked:after:content-['✓'] peer-checked:after:text-white"></div>
            </label>
            <p>{todo.content}</p>
                        <div>
                            <Link href={`/todos/${todo.id}?content=${encodeURIComponent(todo.content)}&status=${todo.status}`} 
                            className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                            >
                                수정
                            </Link>
                            <button className="ml-2 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition"
                            onClick={handleDelete}>
                                삭제
                            </button>
                        </div>
            
        </div>
    )
}