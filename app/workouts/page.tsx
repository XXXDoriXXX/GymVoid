"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Workout } from "@/lib/types";

export default function WorkoutsPage() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        const storedWorkouts: Workout[] = JSON.parse(localStorage.getItem("workouts") || "[]");
        setWorkouts(storedWorkouts);
    }, []);

    return (
        <div className="container-center flex flex-col w-full max-w-3xl mx-auto p-6">
            {/* Заголовок */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-center mb-6"
            >
                📋 Тренування
            </motion.h1>

            {/* Кнопка додавання */}
            <div className="flex justify-center">
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                        href="/workouts/new"
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-xl"
                    >
                        ➕ Додати тренування
                    </Link>
                </motion.div>
            </div>

            {/* Список тренувань */}
            <div className="mt-6 space-y-4 w-full">
                {workouts.length === 0 ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-gray-400 text-center text-lg"
                    >
                        Немає тренувань...
                    </motion.p>
                ) : (
                    workouts.map((workout) => (
                        <motion.div
                            key={workout.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="p-6 glass flex justify-between items-center rounded-2xl shadow-lg transition transform hover:scale-105 hover:shadow-xl"
                        >
                            <div>
                                <h2 className="text-xl font-semibold">{workout.title}</h2>
                                <p className="text-gray-300 text-sm">📅 {workout.day} | 💪 {workout.muscleGroup}</p>
                            </div>
                            <div>
                                <Link
                                    href={`/workouts/${workout.id}`}
                                    className="text-blue-300 hover:text-blue-500 transition"
                                >
                                    🔍 Переглянути
                                </Link>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
