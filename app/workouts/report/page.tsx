"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useRouter } from "next/navigation";

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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

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
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-base">Завантаження звіту...</p>
            </div>
        );
    }

    return (
        <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="rounded-xl shadow border border-gray-200 p-6 w-11/12 max-w-md bg-white/30 backdrop-blur-md"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4 drop-shadow-sm"
                >
                    Звіт по тренуванню
                </motion.h1>

                <div className="overflow-y-auto mb-4" style={{ maxHeight: "60vh" }}>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        <motion.p variants={itemVariants} className="text-base sm:text-lg mb-2 text-gray-800">
                            <span className="font-bold">Назва тренування:</span> {report.workout.title}
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-base sm:text-lg mb-4 text-gray-800">
                            <span className="font-bold">Тривалість:</span> {formatTime(report.timer)}
                        </motion.p>
                        <motion.h2
                            variants={itemVariants}
                            className="text-xl sm:text-2xl font-bold mb-4 text-gray-800"
                        >
                            Вправи та результати:
                        </motion.h2>
                        {report.history.length === 0 ? (
                            <motion.p variants={itemVariants} className="text-gray-500 text-base">
                                Немає даних...
                            </motion.p>
                        ) : (
                            report.history.map((record, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="p-3 mb-3 border border-gray-300 rounded-md bg-white/50 backdrop-blur-sm hover:scale-105 transition-transform"
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
                    </motion.div>
                </div>

                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        onClick={() => router.push("/workouts")}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow transition text-base"
                    >
                        Перейти до тренувань
                    </motion.button>
                </div>
            </motion.div>
        </div>
        </ProtectedRoute>
    );
}
