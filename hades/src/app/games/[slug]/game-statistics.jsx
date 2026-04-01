"use client";

import { useState, useEffect } from "react";
import StatisticsBarChart from "@/app/components/statistics-bar-chart";

export default function GameStats({ game, sessions }) {
    const [selectedSession, setSelectedSession] = useState(null);
    const [itemsToShow, setItemsToShow] = useState(10);

    // Reverse the order of the sessions so that they are in date order from earliest to most recent in the bar chart
    const reversedSessions = [...sessions].reverse();

    // Get the deaths from each session
    const deaths = sessions.reduce((acc, session) => {
        acc[session.title] = Number(session.totalDeaths);
        return acc;
    }, {});

    // Get the maximum number of deaths recorded across all sessions
    const maxDeaths = Math.max(...Object.values(deaths));

    // Set the most recent session as selected by default
    useEffect(() => {
        if (sessions.length > 0) {
            setSelectedSession(sessions[0]); // Default to most recent
        }
    }, [sessions]);

    // Handle showing 5 sessions on mobile and 10 on desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) { // mobile breakpoint
                setItemsToShow(5);
            } else {
                setItemsToShow(10);
            }
        };

        handleResize(); // set initial value
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex flex-col lg:flex-row bg-grey border-light-grey rounded-[15px] p-8 gap-8 w-full justify-between">
            {selectedSession ? (
                <div>
                    <p className="text-sm text-white">
                        Session Date:{" "}
                        {new Intl.DateTimeFormat("fr-FR").format(
                            new Date(selectedSession.date)
                        )}
                    </p>

                    <p className="text-sm text-white">Deaths: {selectedSession.totalDeaths}</p>

                    <div className="my-4 text-sm text-white min-h-16">
                        <strong>Notes</strong>
                        <p>{selectedSession.notes ? selectedSession.notes : "No notes"}</p>
                    </div>

                </div>
            ) : (
                <p className="text-sm text-white">No sessions recorded yet. Start playing!</p>
            )
            
            }

            {/* Bars */}
            <div className="flex gap-6">
                {reversedSessions
                    .slice(-itemsToShow)   // take last N sessions
                    .map((session) => (
                        <StatisticsBarChart
                            key={session.title}
                            label={session.title}
                            value={session.totalDeaths}
                            max={maxDeaths}
                            onClick={() => setSelectedSession(session)}
                        />
                ))}
            </div>
        </div>
    );
}