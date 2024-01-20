import { query, collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../utils/fire-base";
import { useAuth } from "./hooks";



export const useStatus = () => {
    const { userBaseData } = useAuth();
    const [statusListFB, setStatusListFB] = useState<any>();
    const [isStatuseLoading, setIsStatusLoading] = useState(false)
    const [errorState, setErrorState] = useState<unknown | null>(null);
    const [isSuccesStatuse, setIsSuccessStatus] = useState(false);

    useEffect(() => {
        if (!userBaseData) { return };
        const q = query(collection(db, "statusTasks"));

        const unsubscribe = onSnapshot(q, snapshot => {
            const dataStatus = snapshot.docs.map(d => ({
                ...(d.data() as { name: string }[]),
                _id: d.id,

            }));
            setStatusListFB(dataStatus)

        });
        return () => unsubscribe();

    }, [userBaseData]);


    const addStatus = (status: string) => {
        if (!status) return;
        setIsStatusLoading(true);
        try {
            addDoc(collection(db, "statusTasks"), {
                name: status,
            });
            setIsStatusLoading(false);
            setIsSuccessStatus(true);
        } catch (error) {
            setErrorState(error);
            setIsStatusLoading(false);
            setIsSuccessStatus(false);
        } finally {
            setTimeout(() => {
                setErrorState(null);
                setIsSuccessStatus(false);
            }, 5000)
        }
    };

    const deleteStatus = (_id: string) => {
        if (!_id) return;
        console.log(_id);

        setIsStatusLoading(true);
        try {
            deleteDoc(doc(db, "statusTasks", _id));
            setIsStatusLoading(false);
            setIsSuccessStatus(true);
        } catch (error) {
            setErrorState(error);
            setIsStatusLoading(false);
            setIsSuccessStatus(false);
        } finally {
            setTimeout(() => {
                setErrorState(null);
                setIsSuccessStatus(false);
            }, 5000)
        }
    }

    const valueDirections = useMemo(() => ({
        statusListFB,
        isStatuseLoading,
        errorState,
        isSuccesStatuse,
        deleteStatus,
        addStatus
    }), [statusListFB, errorState, isStatuseLoading, isSuccesStatuse]);

    return valueDirections
};

