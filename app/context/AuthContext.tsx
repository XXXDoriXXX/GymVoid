import { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface AuthContextProps {
    isLoggedIn: boolean | null; // Додаємо `null` для очікування ініціалізації
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Початковий стан `null`

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedValue = localStorage.getItem("isLoggedIn") === "true";
            setIsLoggedIn(storedValue);
        }
    }, []);


    const login = () => {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
