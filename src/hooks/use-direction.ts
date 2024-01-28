import { query, collection,  onSnapshot, addDoc, deleteDoc, doc, where, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../utils/fire-base";
import { useAuth } from "./hooks";



export const useDirections = () => {
    const { userBaseData } = useAuth();
    const [directionsListFB, setDirectionsListFB] = useState<any>();
    const [directionsArchive, setDirectionsArchive] = useState<any>();
    const [isDirectionLoading, setIsDirectionLoading] = useState(false)
    const [errorState, setErrorState] = useState<unknown | null>(null);
    const [isSuccesDirection, setIsSuccessDirection] = useState(false);
    const [directionsActive, setDirectionsActive] = useState<any>();
    const directionsRef = collection(db, "direction");

    useEffect(() => {
        if(!userBaseData) {return};
        const q = query(directionsRef);
      
      const unsubscribe = onSnapshot(q, snapshot => {
             const dataDirection = snapshot.docs.map(d => ({
            ...(d.data() as {name: string, status: boolean}[] ),
            _id: d.id,
          
          }));
            setDirectionsListFB(dataDirection)
         
        });
   return () => unsubscribe();
       }, [userBaseData]);


       useEffect(() => {
        if(!userBaseData) {return};
        const q = query(directionsRef, where("status", '==', true));
      
      const unsubscribe = onSnapshot(q, snapshot => {
             const dataDirection = snapshot.docs.map(d => ({
            ...(d.data() as {name: string, status: boolean}[] ),
            _id: d.id,
          
          }));
            setDirectionsActive(dataDirection)
         
        });
   return () => unsubscribe();

    }, [userBaseData]);


    useEffect(() => {
        if(!userBaseData) {return};
        const q = query(directionsRef, where("status", '==', false));
      
      const unsubscribe = onSnapshot(q, snapshot => {
             const dataDirection = snapshot.docs.map(d => ({
            ...(d.data() as {name: string, status: boolean}[] ),
            _id: d.id,
          
          }));
          setDirectionsArchive(dataDirection)
         
        });
   return () => unsubscribe();

    }, [userBaseData]);
        
   
   const addDirection =  (direction: string) => {
       if(!direction) return;
       setIsDirectionLoading(true);
        try {
        addDoc(collection(db, "direction"), {
            name: direction,
            status: true
        });
        setIsDirectionLoading(false);
        setIsSuccessDirection(true);
    } catch (error) {
        setErrorState(error);
        setIsDirectionLoading(false);
        setIsSuccessDirection(false);
    } finally {
        setTimeout(() => {
            setErrorState(null);
            setIsSuccessDirection(false);
        }, 5000)
    }
};

const updateDirectionArchive = (_id: string) => {
    if(!_id) return;

    setIsDirectionLoading(true);
    try {
        // deleteDoc (doc(db, "direction", _id));
        updateDoc(doc(directionsRef, _id), {
            status: false
        })
        setIsDirectionLoading(false);
        setIsSuccessDirection(true);
    } catch (error) {
        setErrorState(error);
        setIsDirectionLoading(false);
        setIsSuccessDirection(false);
    } finally {
        setTimeout(() => {
            setErrorState(null);
            setIsSuccessDirection(false);
        }, 5000)
    }
}
const restoreDirection = (_id: string) => {
    if(!_id) return;

    setIsDirectionLoading(true);
    try {
        updateDoc(doc(directionsRef, _id), {
            status: true
        })
        setIsDirectionLoading(false);
        setIsSuccessDirection(true);
    } catch (error) {
        setErrorState(error);
        setIsDirectionLoading(false);
        setIsSuccessDirection(false);
    } finally {
        setTimeout(() => {
            setErrorState(null);
            setIsSuccessDirection(false);
        }, 5000)
    }
}
const deleteDirection = (_id: string) => {
    if(!_id) return;

    setIsDirectionLoading(true);
    try {
        deleteDoc (doc(db, "direction", _id));
       
        setIsDirectionLoading(false);
        setIsSuccessDirection(true);
    } catch (error) {
        setErrorState(error);
        setIsDirectionLoading(false);
        setIsSuccessDirection(false);
    } finally {
        setTimeout(() => {
            setErrorState(null);
            setIsSuccessDirection(false);
        }, 5000)
    }
}

const valueDirections = useMemo(() => ({
    directionsListFB,
    directionsArchive,
    isDirectionLoading,
    directionsActive, 
    errorState,
    isSuccesDirection,
    deleteDirection,
    restoreDirection,
    addDirection,
    updateDirectionArchive
}), [directionsArchive, directionsActive, directionsListFB, errorState, isDirectionLoading, isSuccesDirection ]);

        return valueDirections
};

