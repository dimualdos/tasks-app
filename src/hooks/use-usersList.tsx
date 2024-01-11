import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../utils/fire-base";
import { useAuth } from "./hooks";


export const useUsersList = () => {
    const { userBaseData } = useAuth();

    const [usersListFB, setUsersListFB] = useState<any>()


    useEffect(() => {
        if (!userBaseData) { return };
        const q = query(collection(db, "users"));

        onSnapshot(q, snapshot => {
            const dataDirection = snapshot.docs.map(d => ({
                ...(d.data() as any)

            }));
            setUsersListFB(dataDirection)
            // setIsProfileLoading(false)
            // setName('')
        })
    }, [userBaseData]);
    const valueUsersList = useMemo(() => ({
        usersListFB
    }), [usersListFB]);

    return valueUsersList
}

