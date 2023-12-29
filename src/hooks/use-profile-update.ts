import { useState } from "react";
import { useAuth } from "./hooks";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/fire-base";



export const useUpdateProfile = (name:string, docId: string) => {
    const { userBaseData } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [isSucces, setIsSuccess] = useState(false);

    const updateProfileUser = async () => {
        

        setIsLoading(true);
        try {
            if(!userBaseData) return;
            const docRef = doc(db, "users", docId);
            await updateDoc(docRef, {
                displayName: name
            });
            setIsSuccess(true);
           setTimeout(() => {
           setIsLoading(false)}, 3000);

        } catch (error) {
            alert(error);
        } finally {
            setIsLoading(false);
        }

    }
return {isLoading, updateProfileUser, isSucces}
}
