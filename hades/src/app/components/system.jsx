"use client";

import { useState, useEffect } from "react";
import Sun from "@/assets/sun";
import Moon from "@/assets/moon";

export default function ThemeToggle({ className }) {
    const [mode, setMode] = useState(() => {
        if (typeof window === "undefined") return "light";

        const saved = localStorage.getItem("mode");
        if (saved) return saved;

        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return systemDark ? "dark" : "light";
    });

    const toggleMode = () => {
        setMode(prev => (prev === "dark" ? "light" : "dark"));
    };

    useEffect(() => {
        const root = document.documentElement;

        if (mode === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("mode", mode);
    }, [mode]);

    return (
        <div onClick={toggleMode} className={`${mode == 'light' ? 'bg-gray-100' : 'bg-zinc-800'} flex gap-2 p-2 rounded-[15px] ${className}`}>
            <div className={`${mode == 'light' ? 'bg-gray-200': 'bg-zinc-800'} rounded-[15px] p-2 transition-colors`}>
                <Sun className="text-black dark:text-white" />
            </div>
            <div className={`${mode == 'dark' ? 'bg-zinc-600': 'bg-gray-100'} rounded-[15px] p-2 transition-colors`}>
                <Moon className="text-black dark:text-white" />
            </div>
        </div>
    );
}