"use client";

import { useAuth } from "@/app/context/AuthContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MyAccount() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg text-white"
        >
            <h1 className="text-3xl font-bold mb-4">My Account</h1>
            <p className="mb-6">Ласкаво просимо, користувачу!</p>
            <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500 hover:bg-red-700 rounded-lg transition"
            >
                Вийти з аккаунта
            </button>
        </motion.div>
    );
}
