"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="container-center text-center">
            <motion.div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                    background: `radial-gradient(circle at ${50 + scrollY * 0.05}% 50%, rgba(255, 255, 255, 0.1), transparent 70%)`,
                }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="p-10 bg-black/30 rounded-3xl shadow-2xl backdrop-blur-lg glass"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl font-extrabold drop-shadow-lg fade-in"
                >
                    Welcome to GymVoid! 🏋️‍♂️
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mt-4 text-lg text-white/80"
                >
                    Your fitness journ  ey starts here.
                </motion.p>
                <div className="mt-6 flex justify-center space-x-4">
                    <Link href="/login" className="px-6 py-2 primary rounded-xl">Login</Link>
                    <Link href="/register" className="px-6 py-2 secondary rounded-xl">Register</Link>
                </div>
            </motion.div>
        </div>
    );
}
