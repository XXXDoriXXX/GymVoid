"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useRouter } from "next/navigation";

interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
    sets: number;
    reps: number;
}

export default function WorkoutCreatePage() {
    const [title, setTitle] = useState("");
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [newExercise, setNewExercise] = useState<Exercise>({
        id: "",
        name: "",
        muscleGroup: "",
        sets: 3,
        reps: 12,
    });
    const router = useRouter();

    const addExercise = () => {
        if (!newExercise.name || !newExercise.muscleGroup) return;
        setExercises([...exercises, { ...newExercise, id: Date.now().toString() }]);
        setNewExercise({ id: "", name: "", muscleGroup: "", sets: 3, reps: 12 });
    };

    const removeExercise = (id: string) => {
        setExercises(exercises.filter((ex) => ex.id !== id));
    };

    const saveWorkout = () => {
        if (!title || exercises.length === 0) {
            alert("Заповніть всі поля!");
            return;
        }
        const newWorkout = { id: Date.now().toString(), title, exercises };
        const storedWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
        localStorage.setItem("workouts", JSON.stringify([...storedWorkouts, newWorkout]));
        alert("Тренування збережено!");
        router.push("/workouts");
    };

    return (
        <ProtectedRoute>
            <div className="container-center p-6 max-w-3xl flex flex-col">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg"
                >
                    🏋️‍♂️ Створити тренування
                </motion.h1>
                <motion.input
                    type="text"
                    placeholder="Назва тренування"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-white/90 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-lg"
                />
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/90 p-6 rounded-xl shadow-lg space-y-4 mt-6 flex flex-col"
                >
                    <h2 className="text-xl font-semibold text-center text-gray-900">
                        ➕ Додати вправу
                    </h2>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Назва вправи"
                            value={newExercise.name}
                            onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                            className="w-full p-2 border border-gray-300 bg-white text-gray-900 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Група м’язів"
                            value={newExercise.muscleGroup}
                            onChange={(e) => setNewExercise({ ...newExercise, muscleGroup: e.target.value })}
                            className="w-full p-2 border border-gray-300 bg-white text-gray-900 rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Кількість підходів"
                            value={newExercise.sets}
                            onChange={(e) => setNewExercise({ ...newExercise, sets: Number(e.target.value) })}
                            className="w-full p-2 border border-gray-300 bg-white text-gray-900 rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Кількість повторень"
                            value={newExercise.reps}
                            onChange={(e) => setNewExercise({ ...newExercise, reps: Number(e.target.value) })}
                            className="w-full p-2 border border-gray-300 bg-white text-gray-900 rounded-lg"
                        />
                    </div>
                    <motion.button
                        onClick={addExercise}
                        whileHover={{ scale: 1.05 }}
                        className="w-full py-3 mt-2 primary text-lg"
                    >
                        Додати вправу
                    </motion.button>
                </motion.div>
                <div className="w-full max-h-64 overflow-y-auto space-y-4 p-2 bg-white/90 rounded-xl shadow-lg border border-gray-200 mt-6 flex flex-col">
                    {exercises.length === 0 ? (
                        <p className="text-gray-400 text-center">Немає вправ...</p>
                    ) : (
                        exercises.map((exercise) => (
                            <motion.div
                                key={exercise.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="p-4 bg-white flex justify-between items-center rounded-lg shadow-md"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {exercise.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        💪 {exercise.muscleGroup} | 🔄 {exercise.sets}x{exercise.reps}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeExercise(exercise.id)}
                                    className="w-10 h-10 flex items-center justify-center text-red-400 hover:text-red-600 transition"
                                >
                                    ❌
                                </button>
                            </motion.div>
                        ))
                    )}
                </div>
                <motion.button
                    onClick={saveWorkout}
                    whileHover={{ scale: 1.05 }}
                    className="w-full py-3 mt-6 primary text-lg shadow-lg"
                >
                    ✅ Зберегти тренування
                </motion.button>
                <div className="text-center mt-4">
                    <Link href="/workouts" className="hover:underline text-blue-300">
                        🔙 Повернутись до тренувань
                    </Link>
                </div>
            </div>
        </ProtectedRoute>
    );
}
