import { FC, useEffect, useMemo, useState } from "react";
import { User } from "@firebase/auth";
import { auth, db, logout, register, loginFireBase } from "../utils/fire-base";
import { addDoc, collection } from "@firebase/firestore";
import { AuthContext } from "../servises/context";


export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const registerHandler = async (email: string, password: string) => {
        setIsLoading(true);
        // setError('');
        try {
            await register(email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    addDoc(collection(db, 'users'), {
                        email: user.email,
                        _id: user.uid,
                    })
                });

            alert(`Пользователь создан: ${email}, ${password}`)

        } catch (error: any) {
            alert(`Ошибка регистрации: ${error}`)
        } finally {
            setIsLoading(false)
        }
    };

    const loginHandler = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            await loginFireBase(email, password);

        } catch (error: any) {
            alert(`Ошибка входа: ${error.code}, ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    };
    const logoutHandler = async () => {
        setIsLoading(true);
        try {
            await logout();
        } catch (error: any) {
            alert(`Ошибка выхода: ${error}`)
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(
        () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                setUser(user || null);
                setIsLoadingInitial(false);
            });
            return () => unsubscribe();
        }, []);

    const valueAuth = useMemo(() => ({
        user: user,
        isLoading,
        register: registerHandler,
        login: loginHandler,
        logout: logoutHandler,
    }), [user, isLoading])

    return (
        <AuthContext.Provider value={valueAuth}>
            {!isLoadingInitial && children}
        </AuthContext.Provider>
    )
}



