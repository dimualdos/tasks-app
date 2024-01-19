import { query, collection,  onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../utils/fire-base";
import { useAuth } from "./hooks";



export const useDirections = () => {
    const { userBaseData } = useAuth();
    const [directionsListFB, setDirectionsListFB] = useState<any>();
    const [isDirectionLoading, setIsDirectioneLoading] = useState(false)
    const [errorState, setErrorState] = useState<unknown | null>(null);
    const [isSuccesDirection, setIsSuccessDirection] = useState(false);

    useEffect(() => {
        if(!userBaseData) {return};
        const q = query(collection(db, "direction"));
      
      const unsubscribe = onSnapshot(q, snapshot => {
             const dataDirection = snapshot.docs.map(d => ({
            ...(d.data() as {name: string}[] ),
            _id: d.id,
          
          }));
            setDirectionsListFB(dataDirection)
         
        });
   return () => unsubscribe();

    }, [userBaseData]);
        
   
   const addDirection =  (direction: string) => {
       if(!direction) return;
       setIsDirectioneLoading(true);
        try {
        addDoc(collection(db, "direction"), {
            name: direction,
        });
        setIsDirectioneLoading(false);
        setIsSuccessDirection(true);
    } catch (error) {
        setErrorState(error);
        setIsDirectioneLoading(false);
        setIsSuccessDirection(false);
    } finally {
        setTimeout(() => {
            setErrorState(null);
            setIsSuccessDirection(false);
        }, 5000)
    }
};

const deleteDirection = (_id: string) => {
    if(!_id) return;
    console.log(_id);

    setIsDirectioneLoading(true);
    try {
        deleteDoc (doc(db, "direction", _id));
        setIsDirectioneLoading(false);
        setIsSuccessDirection(true);
    } catch (error) {
        setErrorState(error);
        setIsDirectioneLoading(false);
        setIsSuccessDirection(false);
    } finally {
        setTimeout(() => {
            setErrorState(null);
            setIsSuccessDirection(false);
        }, 5000)
    }
}

const valueDirections = useMemo(() => ({
    directionsListFB, isDirectionLoading, 
    errorState, isSuccesDirection,
    deleteDirection, addDirection
}), [directionsListFB, errorState, isDirectionLoading, isSuccesDirection ]);

        return valueDirections
};

