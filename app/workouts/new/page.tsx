"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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

    const addExercise = () => {
        if (!newExercise.name || !newExercise.muscleGroup) return;
        setExercises([...exercises, { ...newExercise, id: Date.now().toString() }]);
        setNewExercise({ id: "", name: "", muscleGroup: "", sets: 3, reps: 12 });
    };

    const removeExercise = (id: string) => {
        setExercises(exercises.filter((exercise) => exercise.id !== id));
    };

    const saveWorkout = () => {
        if (!title || exercises.length === 0) return alert("Заповніть всі поля!");

        const newWorkout = {
            id: Date.now().toString(),
            title,
            exercises,
        };

        const storedWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
        localStorage.setItem("workouts", JSON.stringify([...storedWorkouts, newWorkout]));

        alert("Тренування збережено!");
    };

    return (
        <div className="container-center flex flex-col w-full max-w-3xl mx-auto p-6">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-center mb-6 text-white"
            >
                🏋️‍♂️ Створити тренування
            </motion.h1>

            {/* Назва тренування */}
            <input
                type="text"
                placeholder="Назва тренування"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 bg-white/90 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-lg mb-4"
            />

            {/* Додавання вправи */}
            <div className="bg-white/90 p-4 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-900">➕ Додати вправу</h2>
                <input
                    type="text"
                    placeholder="Назва вправи"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                    className="w-full p-2 mb-2 border border-gray-300 bg-white text-gray-900 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Група м’язів"
                    value={newExercise.muscleGroup}
                    onChange={(e) => setNewExercise({ ...newExercise, muscleGroup: e.target.value })}
                    className="w-full p-2 mb-2 border border-gray-300 bg-white text-gray-900 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Кількість підходів"
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise({ ...newExercise, sets: Number(e.target.value) })}
                    className="w-full p-2 mb-2 border border-gray-300 bg-white text-gray-900 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Кількість повторень"
                    value={newExercise.reps}
                    onChange={(e) => setNewExercise({ ...newExercise, reps: Number(e.target.value) })}
                    className="w-full p-2 mb-4 border border-gray-300 bg-white text-gray-900 rounded-lg"
                />
                <motion.button
                    onClick={addExercise}
                    className="w-full py-3 text-lg font-bold rounded-lg bg-blue-500 hover:bg-blue-700 text-white transition transform hover:scale-105"
                    whileHover={{ scale: 1.1 }}
                >
                    Додати вправу
                </motion.button>
            </div>

            {/* Список вправ */}
            <div className="mt-6 space-y-4 w-full">
                {exercises.length === 0 ? (
                    <p className="text-gray-400 text-center">Немає вправ...</p>
                ) : (
                    exercises.map((exercise) => (
                        <motion.div
                            key={exercise.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="p-4 bg-white/90 flex justify-between items-center rounded-xl shadow-lg"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{exercise.name}</h3>
                                <p className="text-gray-600 text-sm">
                                    💪 {exercise.muscleGroup} | 🔄 {exercise.sets}x{exercise.reps}
                                </p>
                            </div>
                            <button
                                onClick={() => removeExercise(exercise.id)}
                                className="text-red-400 hover:text-red-600"
                            >
                                ❌
                            </button>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Кнопка збереження */}
            <motion.button
                onClick={saveWorkout}
                className="w-full py-3 text-lg font-bold rounded-lg bg-green-500 hover:bg-green-700 text-white transition transform hover:scale-105 mt-6"
                whileHover={{ scale: 1.1 }}
            >
                ✅ Зберегти тренування
            </motion.button>

            <Link href="/workouts" className="block text-center mt-4 text-blue-400 hover:underline">
                🔙 Повернутись до тренувань
            </Link>
        </div>
    );
}
