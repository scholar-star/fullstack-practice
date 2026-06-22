"use client";

import { Suspense, use, useEffect, useState} from "react";
import { GET } from "../actions";
import TodoGenerate from "./new/page";
import TodoDate from "@/app/TodoDate";
import TodoFilter from "../TodoFilter";
import TodoSearch from "../TodoSearch";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Loading from "@/app/todos/loading";
import TodoError from "@/app/todos/error";
import TodoListClient from "../TodoListClient";

interface Todo {
    id: number;
    content: string;
    status: boolean;
}

export default function TodosPage() {
    const [todoDate, setTodoDate] = useState<Date>(new Date()); // 선택된 날짜 상태
    const [filter, setFilter] = useState<string>('all'); // 필터 상태
    const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태
    const [refreshKey, setRefreshKey] = useState<number>(0); // 새로고침 키 상태


    const year = todoDate.getFullYear();
    const month = String(todoDate.getMonth() + 1).padStart(2, '0');
    const day = String(todoDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    let todosPromise;

    if (typeof window !== 'undefined') {
        todosPromise = GET(`/api/todos?date=${formattedDate}&filter=${filter}&search=${searchTerm}`)
        .then((result) => result)
    } else {
        todosPromise = Promise.resolve([]); // 서버 사이드 렌더링 시 빈 배열 반환
    }

    const handleAddTodo = () => {
        setRefreshKey(prevKey => prevKey + 1); // 새로고침 키 증가 -> TodoListClient 재렌더링
    }

    const handleDateChange = (date: string) => {
        setTodoDate(new Date(date)); // 날짜 변경 시, 상태 업데이트
    }

    const handleFilter = (filter: string) => {
        setFilter(filter); // 필터 변경 시, 상태 업데이트
    }

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    return (
        <div className="p-6 max-w-xl mx-auto space-y-3 border border-white bg-white rounded-xl shadow-2xl">
            <h1 className="text-6xl font-bold text-blue-700 text-center">Todo</h1>
            <TodoDate onDateChange={handleDateChange} selectedDate={todoDate} />
            <TodoGenerate onAddTodo={handleAddTodo} todoDate={todoDate} />
            <TodoSearch onSearch={handleSearch} />
            <TodoFilter onFilter={handleFilter} />
            <ErrorBoundary errorComponent={TodoError}>
                <Suspense key={`${formattedDate}-${filter}-${searchTerm}-${refreshKey}`} fallback={<Loading />}>
                    <TodoContainer todoPromise={todosPromise} />
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}

// 비동기 데이터를 전달받아 이를 TodoListClient에 전달하는 컴포넌트
function TodoContainer({ todoPromise }: { todoPromise: Promise<Todo[]> }) {
    const initialTodos = use(todoPromise); // Suspense를 사용하여 비동기 데이터 가져오기
    return <TodoListClient initialTodos={initialTodos} />;
}
