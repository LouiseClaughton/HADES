"use client";

import { useEffect, useState } from "react";

export default function StatisticsBarChart({ value, max, onClick }) {
    const [showHeight, setShowHeight] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowHeight(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const height = (value / max) * 100;

    return (
        <div className="flex flex-col items-center justify-end h-64">
            <span>{value}</span>
            <div
                className="bg-red-500 w-4 rounded transition-all duration-300 hover:bg-red-400 hover:cursor-pointer"
                style={{
                    height: value !== 0 && showHeight ? `${height}%` : '8px',
                }}
                onClick={onClick}
            />
        </div>
    );
}