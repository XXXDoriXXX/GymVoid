"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn === false) {
            router.push("/login");
        }
    }, [isLoggedIn, router]);

    if (isLoggedIn === null) {
        return <div className="text-center text-gray-400 text-lg">Перевірка доступу...</div>;
    }


    return <>{children}</>;
}
