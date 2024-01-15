import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../utils/fire-base";
import { useAuth } from "./hooks";


export const useUsersList = () => {
    const { userBaseData } = useAuth();

    const [usersListFB, setUsersListFB] = useState<any>()
    const q = query(collection(db, "users"));


    useEffect(() => {
        if (!userBaseData) { return };

        onSnapshot(q, snapshot => {
            const dataDirection = snapshot.docs.map(d => ({
                ...(d.data() as any)

            }));
            setUsersListFB(dataDirection)

        })
    }, [userBaseData]);

    const valueUsersList = useMemo(() => ({
        usersListFB
    }), [usersListFB]);

    return valueUsersList
}

