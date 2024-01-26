import { query, collection, onSnapshot, addDoc, deleteDoc, doc, where, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../utils/fire-base";
import { useAuth } from "./hooks";



export const useStatus = () => {
    const { userBaseData } = useAuth();
    const [statusListFB, setStatusListFB] = useState<any>();
    const [statusArchive, setStatusArchive] = useState<any>();
    const [statusActive, setStatusActive] = useState<any>();
    const [isStatuseLoading, setIsStatusLoading] = useState(false)
    const [errorState, setErrorState] = useState<unknown | null>(null);
    const [isSuccesStatuse, setIsSuccessStatus] = useState(false);
    const statusRef = collection(db, "statusTasks");



    // получение списка всех статусов задач (в том числе архивных) из базы данных и запись в стейт
    useEffect(() => {
        if (!userBaseData) { return };
        const unsubscribe = onSnapshot(query(statusRef), snapshot => {
            const dataStatus = snapshot.docs.map(d => ({
                ...(d.data() as { name: string }[]),
                _id: d.id,

            }));
            setStatusListFB(dataStatus)

        });
        return () => unsubscribe();

    }, [userBaseData]);

    // получение активных статусов

    useEffect(() => {
        if (!userBaseData) { return };
        const unsubscribe = onSnapshot(query(statusRef, where("status", '==', true)), snapshot => {
            const dataStatus = snapshot.docs.map(d => ({
                ...(d.data() as { name: string }[]),
                _id: d.id,

            }));
            setStatusActive(dataStatus)

        });
        return () => unsubscribe();

    }, [userBaseData]);

    // получение архивных статусов
    useEffect(() => {
        if (!userBaseData) { return };
        const unsubscribe = onSnapshot(query(statusRef, where("status", '==', false)), snapshot => {
            const dataStatus = snapshot.docs.map(d => ({
                ...(d.data() as { name: string }[]),
                _id: d.id,

            }));
            setStatusArchive(dataStatus)

        });
        return () => unsubscribe();

    }, [userBaseData]);

    const addStatus = (status: string) => {
        if (!status) return;
        setIsStatusLoading(true);
        try {
            addDoc(collection(db, "statusTasks"), {
                name: status,
                status: true,
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
    const updateArchiveStatus = (_id: string) => {
        if (!_id) return;
        setIsStatusLoading(true);
        try {
            updateDoc(doc(statusRef, _id), {
                status: false,
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
    const restoreActiveStatus = (_id: string) => {
        if (!_id) return;
        setIsStatusLoading(true);
        try {
            updateDoc(doc(statusRef, _id), {
                status: true,
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
        statusArchive,
        statusActive,
        deleteStatus,
        addStatus,
        updateArchiveStatus,
        restoreActiveStatus
    }), [statusArchive, statusActive, statusListFB, errorState, isStatuseLoading, isSuccesStatuse]);

    return valueDirections
};

