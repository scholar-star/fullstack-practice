
import TodoList from "@/app/todos/TodoList";
import { GET } from "./actions";
import TodoListClient from "./TodoListClient";

interface TodoSuspendProps {
    formattedDate: string;
    filter: string;
    searchTerm: string;
}

// 서버 컴포넌트
export default async function TodoSuspend({formattedDate, filter, searchTerm}: TodoSuspendProps) {
    const result = await GET(`/api/todos?date=${formattedDate}&filter=${filter}&search=${searchTerm}`);
    return <TodoListClient initialTodos={result} />;
}