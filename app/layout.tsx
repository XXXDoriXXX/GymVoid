"use client"; // Додаємо це для Next.js App Router (якщо використовується)

import "../styles/globals.css"; // Підключаємо стилі
import { motion } from "framer-motion"; // Правильний імпорт framer-motion
import Link from "next/link"; // Імпортуємо Link з Next.js

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white">

        {/* Анімоване навігаційне меню */}
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md p-4 shadow-md"
        >
            <div className="container mx-auto flex justify-between items-center">

                {/* Анімований логотип */}
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Link href="/" className="text-lg font-bold text-white drop-shadow-lg">
                        🌟 GymVoid
                    </Link>
                </motion.div>

                {/* Меню входу та реєстрації */}
                <div className="flex space-x-4">
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
                </div>
            </div>
        </motion.nav>

        {/* Контент сторінки */}
        <main className="container mx-auto pt-16 p-4">{children}</main>

        </body>
        </html>
    );
}
