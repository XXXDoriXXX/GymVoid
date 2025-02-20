"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Невірний формат email!");
            return;
        }
        if (password.length < 6) {
            setError("Пароль повинен містити не менше 6 символів!");
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
                <h2 className="text-3xl font-bold text-center mb-4">🔑 Login</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-blue-400"
                    />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-bold rounded-lg bg-blue-500 hover:bg-blue-700 text-white transition transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-4">
                    No account?{" "}
                    <Link href="/register" className="text-blue-400 hover:underline">
                        Register
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
