import { updateDoc, doc } from "firebase/firestore";
import { useMemo, useState } from "react";
import { db } from "../utils/fire-base";
import { useAuth } from "./hooks";



// разрешения для пользователей в приложении
export const useChangesUser = () => {
    const { userBaseData } = useAuth();
    const [isChangesUserLoading, setIsChangesUserLoading] = useState(false);
    const [errorState, setErrorState] = useState<unknown | null>(null);
    const [isSuccesChanges, setIsSuccessChanges] = useState(false);



    const updateChangesUser = async (userChanges: string, idUser: string, changesBool: boolean) => {
        if (!userBaseData || !userChanges) { return };
        const userRef = doc(db, "users", idUser);

        setIsChangesUserLoading(true);
        try {
            await updateDoc(userRef, {
                changesName: userChanges,
                changes: changesBool,
            });
            setIsChangesUserLoading(false);
            setIsSuccessChanges(true);

        } catch (e) {
            setErrorState(e)
            setIsChangesUserLoading(false);

        } finally {
            setTimeout(() => {
                setIsSuccessChanges(false);
                setErrorState(null);
            }, 1500);
        }
    }

    const valueChangeUser = useMemo(() => ({
        updateChangesUser, isChangesUserLoading, errorState, isSuccesChanges,
    }), [errorState, isChangesUserLoading, isSuccesChanges]);

    return valueChangeUser
}

