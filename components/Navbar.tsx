"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";

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
                <div>
                    <Link href="/" className="text-lg font-bold text-white drop-shadow-lg">
                        🌟 GymVoid
                    </Link>
                </div>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <Link href="/myaccount" className="hover:text-green-300 transition">
                            My Account
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="hover:text-blue-300 transition">
                                Login
                            </Link>
                            <Link href="/register" className="hover:text-green-300 transition">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}
