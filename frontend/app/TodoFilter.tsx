"use client";

interface TodoFilterProps {
    onFilter: (filter: string) => void; // 필터 변경 시, 부모에게 보고.
}

export default function TodoFilter({ onFilter }: TodoFilterProps) {
    const handleFilterChange = (filter: string) => {
        onFilter(filter); // 필터 변경 시, 부모에게 보고
    }
    
    return (
        <div className="flex items-center justify-center gap-4">
            <div className="flex items-center justify-center w-35 h-15 gap-2 rounded-md bg-blue-700 text-white px-4 py-2 cursor-pointer hover:bg-blue-900 text-xl"
            onClick={() => handleFilterChange('all')}>
                <span>전체</span>
            </div>
            <div className="flex items-center justify-center w-35 h-15 gap-2 rounded-md bg-blue-700 text-white px-4 py-2 cursor-pointer hover:bg-blue-900 text-xl"
            onClick={() => handleFilterChange('progress')}>
                <span>진행 중</span>
            </div>
            <div className="flex items-center justify-center w-35 h-15 gap-2 rounded-md bg-blue-700 text-white px-4 py-2 cursor-pointer hover:bg-blue-900 text-xl"
            onClick={() => handleFilterChange('completed')}>
                <span>완료</span>
            </div>
        </div>
    )
}