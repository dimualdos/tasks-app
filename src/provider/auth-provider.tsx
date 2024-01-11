import { FC, useEffect, useMemo, useState } from "react";
import { User } from "@firebase/auth";
import { auth, db, logout, register, loginFireBase } from "../utils/fire-base";
import { addDoc, collection } from "@firebase/firestore";
import { AuthContext } from "../servises/context";
import { doc, setDoc } from "firebase/firestore";


export const AuthProvider = ({ children }: any) => {
    const [userBaseData, setUserBaseData] = useState<User | null>(null);
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    // console.log(userBaseData)
    const registerHandler = async (email: string, password: string) => {
        setIsLoading(true);
        // setError('');
        try {
            await register(email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user1 = userCredential.user;
                    setDoc(doc(db, 'users', user1!.uid), {
                        email: user1.email,
                        _id: user1.uid,
                        displayName: '',
                        photoURL: '',
                        createdAt: new Date().toISOString(),
                        tasks: [],
                        projects: [],
                        direction: ''
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
                setUserBaseData(user);
                setIsLoadingInitial(false);
            });
            return () => unsubscribe();
        }, []);

    const valueAuth = useMemo(() => ({
        userBaseData: userBaseData,
        isLoading,
        register: registerHandler,
        login: loginHandler,
        logout: logoutHandler,
    }), [userBaseData, isLoading])

    return (
        <AuthContext.Provider value={valueAuth}>
            {!isLoadingInitial && children}
        </AuthContext.Provider>
    )
}



