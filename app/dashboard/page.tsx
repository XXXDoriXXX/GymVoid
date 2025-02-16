"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Workout {
    id: string;
    title: string;
    exercises: any[];
}

export default function Dashboard() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        const storedWorkouts = localStorage.getItem("workouts");
        if (storedWorkouts) {
            setWorkouts(JSON.parse(storedWorkouts));
        }
    }, []);

    return (
        <div className="container-center">
            <div className="glass flex flex-col p-6 space-y-8">
                <h1 className="text-3xl font-bold text-black text-center">
                    Dashboard
                </h1>

                <div className="flex flex-col space-y-4">
                    <Link href="/workouts">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="primary"
                        >
                            Тренування
                        </motion.button>
                    </Link>
                    <Link href="/workouts/myhistory">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="secondary"
                        >
                            Історія
                        </motion.button>
                    </Link>
                </div>

                <p className="text-black text-center">
                    Збережених тренувань: {workouts.length}
                </p>
            </div>
        </div>
    );
}
