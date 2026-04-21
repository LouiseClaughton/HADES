"use client";

import { useState, useEffect } from "react";
import Sun from "@/assets/sun";
import Moon from "@/assets/moon";

export default function ThemeToggle({ className }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleMode = () => {
        if (!mounted) return;

        const root = document.documentElement;
        const isDark = root.classList.contains("dark");

        root.classList.toggle("dark", !isDark);
        localStorage.setItem("mode", !isDark ? "dark" : "light");
    };

    return (
        <div
            onClick={toggleMode}
            className={`bg-gray-100 dark:bg-zinc-800 flex gap-2 p-2 rounded-[15px] ${className} ${!mounted ? "opacity-50 pointer-events-none" : ""}`}
        >
            <div className="bg-gray-200 dark:bg-zinc-800 rounded-[15px] p-2 transition-colors hover:cursor-pointer">
                <Sun className="text-black dark:text-white" />
            </div>
            <div className="bg-gray-100 dark:bg-zinc-600 rounded-[15px] p-2 transition-colors hover:cursor-pointer">
                <Moon className="text-black dark:text-white" />
            </div>
        </div>
    );
}