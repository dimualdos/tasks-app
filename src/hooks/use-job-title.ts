import { query, collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, where } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../utils/fire-base";
import { useAuth } from "./hooks";

// хук работает с коллекцие JobTitle и Users (в части обновления его должности)

export const useJobTitle = (idUser?: string | null) => {
    const { userBaseData } = useAuth();
    const [dataJobTitle, setDataJobTitle] = useState<any>();
    const [isJobLoading, setIsJobLoading] = useState(false);
    const [errorState, setErrorState] = useState<unknown | null>(null);
    const [isSuccesJob, setIsSuccessJob] = useState(false);
    const [activeJobTitle, setActiveJobTitle] = useState<any>();
    const [archiveJob, setArchiveJob] = useState<any>();
    const jobRef = collection(db, "JobTitle");

    // список всех должностей, включая архивные

    useEffect(() => {
        if (!userBaseData) { return };
        const unsubscribe = onSnapshot(query(jobRef), snapshot => {
            const dataJobTitle = snapshot.docs.map(d => ({
                ...(d.data() as string[]),
                _id: d.id,

            }));
            setDataJobTitle(dataJobTitle);

        });
        return () => unsubscribe();

    }, [userBaseData]);

    // получаем активные должности

    useEffect(() => {
        if (!userBaseData) { return };

        const unsubscribe = onSnapshot(query(jobRef, where("status", '==', true)), snapshot => {
            const dataJobTitle = snapshot.docs.map(d => ({
                ...(d.data() as string[]),
                _id: d.id,

            }));
            setActiveJobTitle(dataJobTitle);

        });
        return () => unsubscribe();

    }, [userBaseData]);

    // получаем архивные должности

    useEffect(() => {
        if (!userBaseData) { return };

        const unsubscribe = onSnapshot(query(jobRef, where("status", '==', false)), snapshot => {
            const dataJobTitle = snapshot.docs.map(d => ({
                ...(d.data() as string[]),
                _id: d.id,

            }));
            setArchiveJob(dataJobTitle);

        });
        return () => unsubscribe();

    }, [userBaseData]);

    // обновляем должность пользователя

    const updateJobUser = async (jobUser: string) => {
        const userRef = doc(db, "users", `${idUser}`);

        if (!userBaseData) { return };
        setIsJobLoading(true);

        try {
            await updateDoc(userRef, {
                jobTitle: jobUser,
            });
            setIsJobLoading(false);
            setIsSuccessJob(true);

        } catch (e) {
            setErrorState(e)
            setIsJobLoading(false);

        } finally {
            setTimeout(() => {
                setIsSuccessJob(false);
                setErrorState(null);
            }, 1500)
        }

    };

    //обновляем список должностей пользователя и добавляем новую должность в базу данных
    const updateJobUsersList = async (jobUser: string) => {
        if (!userBaseData || !jobUser) { return };
        setIsJobLoading(true);

        try {
            await addDoc(jobRef, {
                name: jobUser,
                status: true,
            });
            setIsJobLoading(false);
            setIsSuccessJob(true);

        } catch (e) {
            setErrorState(e)
            setIsJobLoading(false);

        } finally {
            setTimeout(() => {
                setIsSuccessJob(false);
                setErrorState(null);
            }, 1500)
        }
    };
    const updateArchiveUsersJob = async (_id: string) => {
        if (!_id) { return };
        setIsJobLoading(true);

        try {
            await updateDoc(doc(jobRef, _id), {
                status: false,
            });
            setIsJobLoading(false);
            setIsSuccessJob(true);

        } catch (e) {
            setErrorState(e)
            setIsJobLoading(false);

        } finally {
            setTimeout(() => {
                setIsSuccessJob(false);
                setErrorState(null);
            }, 3000)
        }
    };
    const restoreActiveUsersJob = async (_id: string) => {
        if (!_id) { return };
        setIsJobLoading(true);

        try {
            await updateDoc(doc(jobRef, _id), {
                status: true,
            });
            setIsJobLoading(false);
            setIsSuccessJob(true);

        } catch (e) {
            setErrorState(e)
            setIsJobLoading(false);

        } finally {
            setTimeout(() => {
                setIsSuccessJob(false);
                setErrorState(null);
            }, 3000)
        }
    };


    // удаляем должность из базы данных коллекция jobTitle
    const deleteJobTitle = (_id: string) => {
        if (!_id) return;
        setIsJobLoading(true);

        try {
            deleteDoc(doc(jobRef, _id));
            setIsJobLoading(false);
            setIsSuccessJob(true);
        } catch (error) {
            setErrorState(error)
            setIsJobLoading(false);
        } finally {
            setTimeout(() => {
                setIsSuccessJob(false);
                setErrorState(null);
            }, 3000)
        }
    };

    const valueJobList = useMemo(() => ({
        activeJobTitle,
        archiveJob,
        dataJobTitle,
        isJobLoading,
        errorState,
        isSuccesJob,
        updateJobUser,
        deleteJobTitle,
        updateJobUsersList,
        updateArchiveUsersJob,
        restoreActiveUsersJob,

    }), [archiveJob, activeJobTitle, dataJobTitle, errorState, isJobLoading, isSuccesJob]);

    return valueJobList
}

