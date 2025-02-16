"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // ✅ Тепер використовується
    const { login } = useAuth();
    const router = useRouter();

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Невірний формат email!");
            return;
        }
        if (password.length < 6) {
            setError("Пароль повинен містити не менше 6 символів!");
            return;
        }
        if (password !== confirmPassword) {
            setError("Паролі не збігаються!");
            return;
        }

        setError("");
        login();
        router.push("/dashboard");
    };

    return (
        <div className="container-center">
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="glass"
            >
                <h2 className="text-3xl font-bold text-center mb-4">📝 Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-green-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-green-400"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-green-400"
                    />

                    {/* ✅ Відображаємо помилку, якщо вона є */}
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-bold rounded-lg bg-green-500 hover:bg-green-700 text-white transition transform hover:scale-105"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-green-400 hover:underline">
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
