import { query, collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../utils/fire-base";
import { useAuth } from "./hooks";


export const useJobTitle = (idUser?: string | null) => {
    const { userBaseData } = useAuth();
    const [dataJobTitle, setDataJobTitle] = useState<any>();
    const [isJobLoading, setIsJobLoading] = useState(false);
    const [errorState, setErrorState] = useState<unknown | null>(null);
    const [isSuccesJob, setIsSuccessJob] = useState(false);
    const q = query(collection(db, "JobTitle"));

    useEffect(() => {
        if (!userBaseData) { return };
        onSnapshot(q, snapshot => {
            const dataJobTitle = snapshot.docs.map(d => ({
                ...(d.data() as any),
                _id: d.id,

            }));
            setDataJobTitle(dataJobTitle);

        })
    }, [userBaseData]);

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
            }, 5000)
        }

    }

    const updateJobUsersList = async (jobUser: string) => {
        if (!userBaseData || !jobUser) { return };
        setIsJobLoading(true);

        try {
            await addDoc(collection(db, 'JobTitle'), {
                name: jobUser,
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
            }, 5000)
        }
    }
    const deleteJobTitle = (_id: string) => {
        if (!_id) return;
        setIsJobLoading(true);

        try {
            deleteDoc(doc(db, "JobTitle", _id));
            setIsJobLoading(false);
            setIsSuccessJob(true);
        } catch (error) {
            setErrorState(error)
            setIsJobLoading(false);
        } finally {
            setTimeout(() => {
                setIsSuccessJob(false);
                setErrorState(null);
            }, 5000)
        }
    }

    const valueJobList = useMemo(() => ({
        updateJobUser, deleteJobTitle, updateJobUsersList, dataJobTitle, isJobLoading, errorState, isSuccesJob,
    }), [dataJobTitle, errorState, isJobLoading, isSuccesJob]);

    return valueJobList
}

