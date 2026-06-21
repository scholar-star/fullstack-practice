"use client";

import { useState } from "react";

interface TodoGenerateProps {
    onAddTodo: (newTodo: any) => void; // 새로운 Todo 추가 시, 부모에게 보고.
    todoDate: Date; // 선택된 날짜를 부모로부터 전달받음
}

export default function TodoGenerate({ onAddTodo, todoDate }: TodoGenerateProps) {
    const [input, setInput] = useState("");

    const handleAddTodo = async () => {
        try {
            const todoDateString = todoDate.toISOString().split('T')[0]; // 날짜를 'YYYY-MM-DD' 형식으로 변환
            const response = await fetch('/api/todos',  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: input,
                    status: false,
                    created_at: todoDateString
                })
            })
            const newTodo = await response.json();
            onAddTodo(newTodo); // 부모에게 새로운 Todo 추가 보고
            setInput("");
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }
    return (
        <div className="flex items-center justify-center max-w-md mx-auto space-x-3">
            <input type="text" 
            placeholder="할 일을 입력하세요" 
            className="flex-1 p-2 rounded-lg bg-white text-black border border-sky-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-blue-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button
            className="px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition"
            onClick={handleAddTodo}
            >추가</button>
        </div>
    )
}