
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const result = await res.json();
    return NextResponse.json(result);
}

