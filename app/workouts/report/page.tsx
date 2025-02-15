"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Workout {
    id: string;
    title: string;
    exercises: {
        id: string;
        name: string;
        muscleGroup: string;
        sets: number;
        reps: number;
    }[];
}

interface HistoryRecord {
    exerciseId: string;
    exerciseName: string;
    reps: string;
    weight: string;
    notes: string;
    timestamp: string;
}

interface WorkoutReport {
    workout: Workout;
    history: HistoryRecord[];
    timer: number;
}

export default function WorkoutReportPage() {
    const [report, setReport] = useState<WorkoutReport | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedReport = localStorage.getItem("workoutReport");
        if (storedReport) {
            setReport(JSON.parse(storedReport));
        }
    }, []);

    const formatTime = (sec: number) => {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    if (!report) {
        return (
            <div className="flex items-center justify-center min-h-screen pt-16 bg-gray-50">
                <p className="text-gray-600 text-base">Завантаження звіту...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-16 flex flex-col">
            <div className="container mx-auto px-4 flex flex-col flex-grow">
                <motion.h1
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4 drop-shadow-sm"
                >
                    Звіт по тренуванню
                </motion.h1>

                {/* Область звіту з прокручуванням */}
                <div
                    className="bg-white rounded-lg shadow border border-gray-200 p-4 flex-grow overflow-y-auto mb-4"
                    style={{ maxHeight: "60vh" }}
                >
                    <p className="text-base sm:text-lg mb-2 text-gray-800">
                        <span className="font-bold">Назва тренування:</span>{" "}
                        {report.workout.title}
                    </p>
                    <p className="text-base sm:text-lg mb-4 text-gray-800">
                        <span className="font-bold">Тривалість:</span>{" "}
                        {formatTime(report.timer)}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
                        Вправи та результати:
                    </h2>
                    {report.history.length === 0 ? (
                        <p className="text-gray-500 text-base">Немає даних...</p>
                    ) : (
                        report.history.map((record, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="p-3 mb-3 border border-gray-300 rounded-md"
                            >
                                <p className="font-semibold text-base sm:text-lg text-gray-800">
                                    {record.exerciseName}
                                </p>
                                <p className="text-gray-600 text-sm sm:text-base">
                                    Повторення: {record.reps} | Вага: {record.weight} кг
                                </p>
                                {record.notes && (
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Примітки: {record.notes}
                                    </p>
                                )}
                                <p className="text-gray-500 text-xs mt-1">{record.timestamp}</p>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Кнопка переходу до тренувань */}
                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        onClick={() => router.push("/workouts")}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow transition text-base"
                    >
                        Перейти до тренувань
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
