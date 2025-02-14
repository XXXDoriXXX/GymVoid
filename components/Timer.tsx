"use client";

import { useState } from "react";

export default function Timer() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    const toggleTimer = () => {
        setRunning(!running);
        if (!running) {
            const interval = setInterval(() => {
                setTime((t) => t + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    };

    return (
        <div>
            <h2 className="text-2xl">{time} секунд</h2>
            <button onClick={toggleTimer} className="bg-red-500 text-white p-3 rounded-lg">
                {running ? "Зупинити" : "Старт"}
            </button>
        </div>
    );
}
