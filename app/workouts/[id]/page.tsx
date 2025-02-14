"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
}

interface HistoryRecord {
    exerciseId: string;
    exerciseName: string;
    reps: string;
    weight: string;
    notes: string;
    timestamp: string;
}

export default function WorkoutViewPage() {
    const router = useRouter();
    const { id } = useParams();
    const [workout, setWorkout] = useState<Workout | null>(null);
    const [completedSets, setCompletedSets] = useState<{ [key: string]: number }>({});
    const [modalExercise, setModalExercise] = useState<{ id: string; name: string } | null>(null);
    const [repsDone, setRepsDone] = useState("");
    const [weightUsed, setWeightUsed] = useState("");
    const [notes, setNotes] = useState("");
    const [history, setHistory] = useState<HistoryRecord[]>([]);

    // Timer states
    const [showTimer, setShowTimer] = useState(false);
    const [detachedTimer, setDetachedTimer] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // History modal state
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        if (!id) return;
        const storedWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
        const foundWorkout = storedWorkouts.find((w: Workout) => w.id === id);
        if (foundWorkout) setWorkout(foundWorkout);
        else router.push("/workouts");
    }, [id, router]);

    useEffect(() => {
        if (timerRunning) {
            timerRef.current = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [timerRunning]);

    const handleCompleteSet = (exerciseId: string, exerciseName: string) => {
        setModalExercise({ id: exerciseId, name: exerciseName });
    };

    const confirmSetCompletion = () => {
        if (!modalExercise) return;
        setCompletedSets((prev) => ({
            ...prev,
            [modalExercise.id]: (prev[modalExercise.id] || 0) + 1,
        }));
        const newRecord: HistoryRecord = {
            exerciseId: modalExercise.id,
            exerciseName: modalExercise.name,
            reps: repsDone,
            weight: weightUsed,
            notes,
            timestamp: new Date().toLocaleString(),
        };
        setHistory((prev) => [...prev, newRecord]);
        setModalExercise(null);
        setRepsDone("");
        setWeightUsed("");
        setNotes("");
    };

    const deleteHistoryRecord = (timestamp: string) => {
        setHistory((prev) => prev.filter((record) => record.timestamp !== timestamp));
    };

    // Format seconds into mm:ss
    const formatTime = (sec: number) => {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    if (!workout) {
        return <div className="text-center text-gray-400 text-lg">Завантаження...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4 relative">
            {/* Main Workout Container */}
            <div className="workout-container w-full max-w-2xl bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-2xl">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-center mb-6 text-white"
                >
                    🏋️‍♂️ {workout.title}
                </motion.h1>

                {/* Timer and History buttons */}
                <div className="flex justify-between mb-4">
                    <button
                        onClick={() => {
                            setShowTimer(true);
                            setDetachedTimer(false);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        ⏱️ Таймер
                    </button>
                    <button
                        onClick={() => setShowHistory(true)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
                    >
                        📜 Історія
                    </button>
                </div>

                {/* Exercises List */}
                <div className="overflow-y-auto max-h-96 space-y-4 p-2">
                    {workout.exercises.map((exercise) => {
                        const completedSetsCount = completedSets[exercise.id] || 0;
                        const allSetsDone = completedSetsCount >= exercise.sets;
                        return (
                            <motion.div
                                key={exercise.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="p-4 flex flex-col bg-white rounded-xl shadow-lg"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold">{exercise.name}</h3>
                                    <p className="text-gray-600 text-sm">
                                        💪 {exercise.muscleGroup} | 🔄 {exercise.sets} підходів x {exercise.reps} повторень
                                    </p>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <AnimatePresence>
                                        {!allSetsDone
                                            ? [...Array(exercise.sets)].map((_, index) =>
                                                completedSetsCount > index ? null : (
                                                    <motion.button
                                                        key={index}
                                                        onClick={() => handleCompleteSet(exercise.id, exercise.name)}
                                                        className="px-3 py-2 rounded-lg text-white font-semibold bg-gray-300 hover:bg-gray-400"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        whileHover={{ scale: 1.1 }}
                                                    >
                                                        {index + 1}
                                                    </motion.button>
                                                )
                                            )
                                            : (
                                                <motion.button
                                                    className="px-4 py-2 rounded-lg text-white font-semibold bg-green-500"
                                                    initial={{ scale: 0.8 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    ✅ Виконано
                                                </motion.button>
                                            )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.button
                    onClick={() => router.push("/workouts")}
                    className="w-full py-3 text-lg font-bold rounded-lg bg-red-500 hover:bg-red-700 text-white transition transform hover:scale-105 mt-6"
                >
                    ❌ Завершити тренування
                </motion.button>

                <Link href="/workouts" className="block text-center mt-4 text-blue-400 hover:underline">
                    🔙 Повернутись до тренувань
                </Link>
            </div>

            {/* Detached Timer Widget (visible when timer is running and modal is closed) */}
            {detachedTimer && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 p-4 rounded-xl shadow-2xl text-white z-40 flex items-center space-x-4"
                >
                    <div className="text-2xl font-mono">{formatTime(timer)}</div>
                    <button
                        onClick={() => {
                            setShowTimer(true);
                            setDetachedTimer(false);
                        }}
                        className="px-3 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg"
                    >
                        Розгорнути
                    </button>
                </motion.div>
            )}

            {/* Set Completion Modal */}
            <AnimatePresence>
                {modalExercise && (
                    <motion.div
                        key="set-modal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    >
                        <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md text-white">
                            <h2 className="text-2xl font-bold mb-2">✅ Виконано {modalExercise.name}</h2>
                            <p className="text-gray-300 mb-4">Введіть дані:</p>
                            <div className="mb-4">
                                <label className="block mb-1">Кількість повторень:</label>
                                <input
                                    type="number"
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                                    value={repsDone}
                                    onChange={(e) => setRepsDone(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Вага (кг):</label>
                                <input
                                    type="number"
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                                    value={weightUsed}
                                    onChange={(e) => setWeightUsed(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Примітки:</label>
                                <textarea
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between">
                                <motion.button
                                    onClick={() => setModalExercise(null)}
                                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                                >
                                    ❌ Закрити
                                </motion.button>
                                <motion.button
                                    onClick={confirmSetCompletion}
                                    className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700"
                                >
                                    ✅ Підтвердити
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Timer Modal */}
            <AnimatePresence>
                {showTimer && (
                    <motion.div
                        key="timer-modal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    >
                        <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md text-white">
                            <h2 className="text-2xl font-bold mb-4">⏱️ Таймер</h2>
                            <div className="text-4xl font-mono text-center mb-4">{formatTime(timer)}</div>
                            <div className="flex justify-around">
                                <button
                                    onClick={() => setTimerRunning((prev) => !prev)}
                                    className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700"
                                >
                                    {timerRunning ? "Пауза" : "Старт"}
                                </button>
                                <button
                                    onClick={() => {
                                        setTimer(0);
                                        setTimerRunning(false);
                                    }}
                                    className="px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600"
                                >
                                    Скинути
                                </button>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={() => {
                                        // Якщо таймер працює, від'єднуємо його замість закриття
                                        if (timerRunning) {
                                            setDetachedTimer(true);
                                        }
                                        setShowTimer(false);
                                    }}
                                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                                >
                                    ❌ Закрити
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* History Modal */}
            <AnimatePresence>
                {showHistory && (
                    <motion.div
                        key="history-modal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    >
                        <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md text-white max-h-[80vh] overflow-y-auto">
                            <h2 className="text-2xl font-bold mb-4">📜 Історія підходів</h2>
                            {history.length === 0 ? (
                                <p className="text-gray-300">Історія порожня</p>
                            ) : (
                                history.map((record) => (
                                    <motion.div
                                        key={record.timestamp}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.3 }}
                                        className="mb-4 p-3 border border-gray-700 rounded-lg"
                                    >
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-lg">{record.exerciseName}</p>
                                            <button
                                                onClick={() => deleteHistoryRecord(record.timestamp)}
                                                className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600"
                                            >
                                                <span className="text-xl">&times;</span>
                                            </button>
                                        </div>
                                        <p className="text-gray-300 text-sm">
                                            Повторення: {record.reps} | Вага: {record.weight} кг
                                        </p>
                                        {record.notes && (
                                            <p className="text-gray-200 text-sm">Примітки: {record.notes}</p>
                                        )}
                                        <p className="text-gray-400 text-xs mt-1">{record.timestamp}</p>
                                    </motion.div>
                                ))
                            )}
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => setShowHistory(false)}
                                    className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600"
                                >
                                    <span className="text-xl">&times;</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
