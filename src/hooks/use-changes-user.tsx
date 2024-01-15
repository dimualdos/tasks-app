import { updateDoc, doc } from "firebase/firestore";
import { useMemo, useState } from "react";
import { db } from "../utils/fire-base";
import { useAuth } from "./hooks";

export const useChangesUser = (idUser: string) => {
    const { userBaseData } = useAuth();
    const [isChangesUserLoading, setIsChangesUserLoading] = useState(false);
    const [errorState, setErrorState] = useState<unknown | null>(null);
    const [isSuccesChanges, setIsSuccessChanges] = useState(false);



    const updateChangesUser = async (userChanges: string) => {
        if (!userBaseData || !userChanges || !idUser) { return };
        const userRef = doc(db, "users", idUser);

        setIsChangesUserLoading(true);

        try {
            await updateDoc(userRef, {
                changes: userChanges,
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
            }, 3000);
        }
    }

    const valueChangeUser = useMemo(() => ({
        updateChangesUser, isChangesUserLoading, errorState, isSuccesChanges,
    }), [errorState, isChangesUserLoading, isSuccesChanges]);

    return valueChangeUser
}

