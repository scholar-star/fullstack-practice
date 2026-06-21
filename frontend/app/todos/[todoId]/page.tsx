
// client component의 경우 비동기 fetch 허용 X

import TodoEditForm from "./TodoEditForm";

interface TodoEditProps {
    params: Promise<{ todoId: string }>;
    searchParams: Promise<{ content: string; status: string }>;
}

// 비동기로 받아와야 하는 searchParams와 params를 TodoEditForm에 전달하기 위해 TodoEdit 컴포넌트를 생성.
export default async function TodoEdit({ params, searchParams }: TodoEditProps) {
    const {todoId} = await params;
    const sParams = await searchParams;

    const initialContent = sParams.content;
    const initialStatus = sParams.status === 'true';

    return (
        <TodoEditForm todoId={todoId} initialContent={initialContent} initialStatus={initialStatus} />
    )
}
