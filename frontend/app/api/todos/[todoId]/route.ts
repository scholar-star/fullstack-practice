
import { NextResponse } from 'next/server';

export async function PUT(request: Request, {params}: {params: Promise<{todoId: string}>}) {
    const {todoId} = await params; // 비동기로 매개변수를 받는다.
    const body = await request.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos/${todoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const result = await res.json();
    return NextResponse.json(result);
}

export async function DELETE(request: Request, {params}: {params: Promise<{todoId: string}>}) {
    const {todoId} = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos/${todoId}`, {
        method: 'DELETE'
    });
    const result = await response.json();
    return NextResponse.json(result);
}
