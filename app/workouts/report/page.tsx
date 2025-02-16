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
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
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
        if (storedReport) setReport(JSON.parse(storedReport));
    }, []);

    const formatTime = (sec: number) => {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    if (!report) {
        return (
            <div className="container-center p-6">
                <p className="text-gray-300 text-base">Завантаження звіту...</p>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div className="container-center p-4 flex flex-col">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="glass w-11/12 max-w-md p-6"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl font-extrabold text-center mb-4 drop-shadow-sm"
                    >
                        Звіт по тренуванню
                    </motion.h1>
                    <div className="overflow-y-auto mb-4" style={{ maxHeight: "60vh" }}>
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <motion.p variants={itemVariants} className="text-base sm:text-lg mb-2">
                                <span className="font-bold">Назва тренування:</span> {report.workout.title}
                            </motion.p>
                            <motion.p variants={itemVariants} className="text-base sm:text-lg mb-4">
                                <span className="font-bold">Тривалість:</span> {formatTime(report.timer)}
                            </motion.p>
                            <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl font-bold mb-4">
                                Вправи та результати:
                            </motion.h2>
                            {report.history.length === 0 ? (
                                <motion.p variants={itemVariants} className="text-gray-300 text-base">
                                    Немає даних...
                                </motion.p>
                            ) : (
                                report.history.map((record, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="p-3 mb-3 border rounded-md bg-white/50 backdrop-blur-sm transition transform hover:scale-105"
                                    >
                                        <p className="font-semibold text-base sm:text-lg">{record.exerciseName}</p>
                                        <p className="text-sm sm:text-base">
                                            Повторення: {record.reps} | Вага: {record.weight} кг
                                        </p>
                                        {record.notes && (
                                            <p className="text-sm sm:text-base">Примітки: {record.notes}</p>
                                        )}
                                        <p className="text-xs mt-1 text-gray-300">{record.timestamp}</p>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    </div>
                    <div className="flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            onClick={() => router.push("/workouts")}
                            className="px-6 py-3 primary text-base"
                        >
                            Перейти до тренувань
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </ProtectedRoute>
    );
}
