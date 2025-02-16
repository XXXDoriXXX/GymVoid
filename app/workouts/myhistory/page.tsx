"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProtectedRoute from "@/app/components/ProtectedRoute";

interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
    sets: number;
    reps: number;
}

interface Workout {
    id: string;
    title: string;
    exercises: Exercise[];
    completedAt?: string;
    notes?: string;
}

export default function MyHistoryList() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        const storedWorkouts = localStorage.getItem("workouts");
        if (storedWorkouts) {
            setWorkouts(JSON.parse(storedWorkouts));
        }
    }, []);

    return (
        <ProtectedRoute>
            <div className="container-center p-6 flex flex-col">
                <h1 className="text-3xl font-bold text-center mb-6 text-white">
                    Історія виконаних тренувань
                </h1>
                {workouts.length === 0 ? (
                    <p className="text-gray-300 text-center">
                        Ви ще не виконували тренування.
                    </p>
                ) : (
                    <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 150px)" }}>
                        <div className="flex flex-col gap-4">
                            {workouts.map((workout) => (
                                <Link key={workout.id} href={`/workout/myhistory/${workout.id}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        className="glass w-full cursor-pointer flex flex-col p-4"
                                    >
                                        <h2 className="text-lg font-semibold mb-1 text-white">
                                            {workout.title}
                                        </h2>
                                        {workout.completedAt && (
                                            <p className="text-xs text-gray-200">
                                                Дата: <span className="font-medium">{workout.completedAt}</span>
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-200">
                                            Вправ: <span className="font-medium">{workout.exercises.length}</span>
                                        </p>
                                        {workout.notes && (
                                            <p className="text-xs text-gray-200 mt-1">
                                                Нотатки: <span className="font-medium">{workout.notes}</span>
                                            </p>
                                        )}
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="mt-3 py-1 px-3 secondary text-xs self-center"
                                        >
                                            Деталі
                                        </motion.button>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-6">
                    <Link href="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="py-2 px-4 primary w-full"
                        >
                            🔙 Повернутись на Dashboard
                        </motion.button>
                    </Link>
                </div>
            </div>
        </ProtectedRoute>
    );
}
