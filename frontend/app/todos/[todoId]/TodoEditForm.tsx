"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 이를 표시하는 TodoEditForm 컴포넌트. 클라이언트 컴포넌트로 수행
export default function TodoEditForm({ todoId, initialContent, initialStatus }: { todoId: string; initialContent: string; initialStatus: boolean }) {
    const [editedContent, setEditedContent] = useState(initialContent);
    const [status, setStatus] = useState(initialStatus);

    const router = useRouter();

    const handleUpdate = async () => {
        if (!editedContent.trim()) return;

        try {
            const response = await fetch(`/api/todos/${todoId}`, {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: editedContent, status })
            });
            
            if (response.ok) {
                router.push('/'); // 수정 완료 후, Todo 목록 페이지로 이동  
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-sky-100">
            <div className="relative max-w-md w-full rounded-xl bg-white p-6 shadow-2xl transition-all flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center">Todo 수정</h2>
                <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="p-2 rounded-lg bg-white text-black border border-blue-500 placeholder-gray-400 focus:outline-none focus:ring-2"
                />
                <div className ="flex flex-row items-center w-full gap-3">
                    <div className = "flex items-center bg-sky-300 py-2 px-3 rounded-lg flex-1 w-full">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                            <span className="text-black">완료함</span>
                        </label>
                    </div>
                    <div className="flex items-center justify-end">
                        <button onClick={handleUpdate} className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition">
                        수정 완료
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
