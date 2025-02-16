"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function WorkoutDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [workout, setWorkout] = useState<Workout | null>(null);

    useEffect(() => {
        const storedWorkouts = localStorage.getItem("workouts");
        if (storedWorkouts) {
            const workouts: Workout[] = JSON.parse(storedWorkouts);
            const foundWorkout = workouts.find((w) => w.id === id);
            if (foundWorkout) setWorkout(foundWorkout);
        }
    }, [id]);

    if (!workout) {
        return (
            <ProtectedRoute>
                <div className="container-center p-6 flex flex-col">
                    <p className="text-gray-300 mb-4 text-center">Тренування не знайдено.</p>
                    <Link href="/workouts/myhistory">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="py-2 px-4 primary w-full"
                        >
                            Повернутись до історії
                        </motion.button>
                    </Link>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="container-center p-6 flex flex-col">
                <h1 className="text-3xl font-bold text-center mb-8 text-white">
                    {workout.title}
                </h1>
                <div className="flex flex-col gap-6">
                    {workout.exercises.map((ex) => (
                        <motion.div
                            key={ex.id}
                            whileHover={{ scale: 1.03 }}
                            className="glass w-full h-40 flex flex-col justify-between p-4"
                        >
                            <h2 className="text-xl font-semibold text-white">{ex.name}</h2>
                            <p className="text-gray-200 text-sm">
                                Група м’язів: <span className="font-medium">{ex.muscleGroup}</span>
                            </p>
                            <p className="text-sm text-gray-200">
                                Підходи: <span className="font-medium">{ex.sets}</span> | Повторення:{" "}
                                <span className="font-medium">{ex.reps}</span>
                            </p>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-8">
                    <motion.button
                        onClick={() => router.back()}
                        whileHover={{ scale: 1.05 }}
                        className="py-2 px-4 primary w-full"
                    >
                        🔙 Повернутись назад
                    </motion.button>
                </div>
            </div>
        </ProtectedRoute>
    );
}
