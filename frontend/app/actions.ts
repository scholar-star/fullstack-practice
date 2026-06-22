import { NextRequest} from "next/server";

export async function GET(path: string) {
    const url = new URL(path, process.env.NEXT_PUBLIC_BASE_URL); // Base URL을 지정
    console.log('GET 요청 URL:', url.href); // 전체 URL 로그 출력
    const searchParams = url.searchParams;

    const date = searchParams.get('date');
    const filter = searchParams.get('filter'); // 필터 값 가져오기
    const search = searchParams.get('search'); // 검색어 값 가져오기

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos?date=${date}&filter=${filter}&search=${search}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
    });
    const todos = await response.json();
    return todos;
}