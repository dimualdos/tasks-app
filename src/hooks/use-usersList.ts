import { query, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../utils/fire-base";
import { useAuth } from "./hooks";
import { IProfile } from "../utils/types";


export const useUsersList = () => {
    const { userBaseData } = useAuth();

    const [usersListFB, setUsersListFB] = useState<any>()
    const q = query(collection(db, "users"));

    // получение всех пользовавтелей
    useEffect(() => {
        if (!userBaseData) { return };

        const unsubscribe = onSnapshot(q, snapshot => {
            const dataDirection = snapshot.docs.map(d => ({
                ...(d.data() as IProfile[])

            }));
            setUsersListFB(dataDirection)

        });
        return () => unsubscribe();

    }, [userBaseData]);
    // console.log(usersListFB);
    const valueUsersList = useMemo(() => ({
        usersListFB
    }), [usersListFB]);

    return valueUsersList
}

