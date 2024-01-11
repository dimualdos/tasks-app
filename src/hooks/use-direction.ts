import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../utils/fire-base";
import { useAuth } from "./hooks";


export const useDirections = () => {
    const { userBaseData } = useAuth();

    const [directionsListFB, setDirectionsListFB] = useState<any>()


    useEffect(() => {
        if(!userBaseData) {return};
        const q = query(collection(db, "direction"), where('profile', '==', 'ID'));
      
        onSnapshot(q, snapshot => {
             const dataDirection = snapshot.docs.map(d => ({
            ...(d.data() as any )
          
          }));
            setDirectionsListFB(dataDirection)
            // setIsProfileLoading(false)
            // setName('')
        })}, [userBaseData]);
        const valueDirections = useMemo(() => ({
            directionsListFB
        }), [directionsListFB]);

        return valueDirections
}

