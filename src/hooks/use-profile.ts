import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./hooks";
import { collection, doc, limit, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../utils/fire-base";
import { IProfile } from "../utils/types";


export const useProfile = (  ) => {
 const {userBaseData} = useAuth();

const [isProfileLoading, setIsProfileLoading] = useState(true)
const [profile, setProfile] = useState<IProfile >({} as IProfile);
const [name, setName] = useState('');
useEffect(() => {
if(!userBaseData) {return};

 const q = query(collection(db, "users"), where('_id', "==", userBaseData.uid), limit(1));

onSnapshot(q, snapshot => {
     const dataProfile = snapshot.docs.map(d => ({
    ...(d.data() as IProfile)
  
  }))[0];
    setProfile(dataProfile)
    setIsProfileLoading(false)
    setName('')
})}, [userBaseData]);
const valueUser = useMemo(() => ({
    profile, isProfileLoading, name, setName
}), [isProfileLoading, name, profile]);
return valueUser
}
