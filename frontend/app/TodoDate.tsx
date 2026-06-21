"use client"

import { startOfWeek } from "date-fns";
import { useState } from "react";
import { subWeeks, addWeeks, addDays, format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react"; // 아이콘 라이브러리 -> 좌우 화살표

interface TodoDateProps {
    onDateChange: (date: string) => void; // 날짜 변경 시, 부모에게 보고.
    selectedDate: Date; // 선택된 날짜를 부모로부터 받음
}

export default function TodoDate({ onDateChange, selectedDate }: TodoDateProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const weekStartDay = startOfWeek(currentDate); // 이번 주의 시작 날짜 계산

    const week = Array.from({ length: 7 }, (_, i) => {
        const day = addDays(weekStartDay, i);
        return {
            date: day,
            dayName: format(day, 'EEE')
        }
    });

    const handlePrevious = () => {
        // 이전 주로 이동하는 로직
        setCurrentDate((prev) => subWeeks(prev, 1)); // 1주 전 날짜
    }

    const handleNext = () => {
        // 다음 주로 이동하는 로직
        setCurrentDate((prev) => addWeeks(prev, 1)); // 1주 후 날짜
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div>
                <span className="text-lg font-bold text-black">{format(currentDate, 'yyyy년 MM월')}</span>
            </div>
            <div className = "flex items-center justify-center w-full">
                <button onClick={handlePrevious} className="p-2 rounded-full hover:bg-gray-200">
                    <ChevronLeft />
                </button>
                <div className="flex items-center justify-center border border-sky-400 bg-white rounded-lg p-2 mx-4">
                    {week.map((day, index) => {
                        const date = format(day.date, 'yyyy-MM-dd');
                        console.log(date, selectedDate);
                        const isSelected = date === format(selectedDate, 'yyyy-MM-dd');
                        return (
                            <div key={index}
                                onClick={() => onDateChange(format(day.date, 'yyyy-MM-dd'))}
                                className={`flex flex-col items-center justify-center cursor-pointer flex-1 py-2 px-2 min-w-[60] border-r border-blue-700 last:border-r-0`}>
                                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${isSelected ? 'bg-blue-500 text-white' : ''}`}>
                                    <span className="text-xl font-bold">{day.date.getDate()}</span>
                                </div>
                            <span className="text-sm text-sky-300 mt-1 block w-full text-center">{day.dayName}</span>
                        </div>)
                    })}
                </div>
                <button onClick={handleNext} className="p-2 rounded-full hover:bg-gray-200">
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}