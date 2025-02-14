"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Workout } from "@/lib/types"; // Імпортуємо тип

interface WorkoutFormProps {
    workout?: Workout;
    onSave: (workout: Workout) => void;
}

export default function WorkoutForm({ workout, onSave }: WorkoutFormProps) {
    const [title, setTitle] = useState(workout?.title || "");
    const [day, setDay] = useState(workout?.day || "Понеділок");
    const [muscleGroup, setMuscleGroup] = useState(workout?.muscleGroup || "");
    const [sets, setSets] = useState<number>(workout?.sets || 3);
    const [reps, setReps] = useState<number>(workout?.reps || 12);
    const [notes, setNotes] = useState(workout?.notes || "");

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newWorkout: Workout = {
            id: workout?.id || Date.now().toString(),
            title,
            day,
            muscleGroup,
            sets,
            reps,
            notes,
        };

        onSave(newWorkout);
        router.push("/workouts");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <input type="text" placeholder="Назва вправи" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded-lg" required />
            <select value={day} onChange={(e) => setDay(e.target.value)} className="w-full p-2 border rounded-lg">
                {["Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота", "Неділя"].map((d) => (
                    <option key={d} value={d}>{d}</option>
                ))}
            </select>
            <input type="text" placeholder="Група м’язів" value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)} className="w-full p-2 border rounded-lg" required />
            <input type="number" placeholder="Кількість підходів" value={sets} onChange={(e) => setSets(Number(e.target.value))} className="w-full p-2 border rounded-lg" required />
            <input type="number" placeholder="Кількість повторень" value={reps} onChange={(e) => setReps(Number(e.target.value))} className="w-full p-2 border rounded-lg" required />
            <textarea placeholder="Коментарі" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 border rounded-lg"></textarea>
            <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full">Зберегти</button>
        </form>
    );
}
