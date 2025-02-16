"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
    const { isLoggedIn } = useAuth();

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md p-4 shadow-md"
        >
            <div className="container mx-auto flex justify-between items-center">
                {/* Анімований логотип: переходить на /dashboard якщо авторизований, інакше на головну */}
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Link href={isLoggedIn ? "/dashboard" : "/"}>
                        <span className="text-lg font-bold text-white drop-shadow-lg">
                            🌟 GymVoid
                        </span>
                    </Link>
                </motion.div>

                {/* Динамічне меню */}
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Link href="/myaccount" className="hover:text-green-300 transition">
                                My Account
                            </Link>
                        </motion.div>
                    ) : (
                        <>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="/login" className="hover:text-blue-300 transition">
                                    Login
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="/register" className="hover:text-green-300 transition">
                                    Register
                                </Link>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}
