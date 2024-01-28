import { useMemo, useState } from "react";
import { useAuth } from "./hooks";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, getStorageFirebase } from "../utils/fire-base";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



export const useUpdateProfileUsers = () => {
    const { userBaseData } = useAuth();
    const user = auth.currentUser;

    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [isLoadingPhotoProfile, setIsLoadingPhotoProfile] = useState(false);
    
    const [isSuccesProfile, setIsSuccessProfile] = useState(false);
    const [errorState, setErrorState] = useState<unknown | null>(null);

    const docRef1 = doc(db, "users", `${user?.uid}`);

    const updateNameProfileUser = async (name: string) => {
    // const docRef = doc(db, "users", userBaseData!.uid);
        

        setIsLoadingProfile(true);
        try {
            if(!userBaseData || !user) return;
            await updateDoc(docRef1, {
                displayName: name
            });
            await updateProfile(user, {
                displayName: name
            });
            setIsSuccessProfile(true);

           setTimeout(() => {
           setIsLoadingProfile(false)}, 3000);

        } catch (error) {
            alert(error);
            setIsLoadingProfile(false);
            setIsSuccessProfile(false);
        } finally {
            setTimeout(() => {
                setIsLoadingProfile(false);
                setIsSuccessProfile(false);
            }, 3000);

        }

    }

    const updatePhotoProfileUser = async (fileImage: any ) => {
        if (!user || !fileImage || !auth) return;
        try {
            setIsLoadingPhotoProfile(true)
            // 2 - Upload the image to Cloud Storage.
            const filePath = `${auth.currentUser!.uid}/${fileImage.current.files[0].name}`;
            //const filePath = `${auth.currentUser!.uid}/${filePhoto.name}`;

            const newImageRef = ref(getStorageFirebase, filePath);
            const fileSnapshot = await uploadBytes(newImageRef, fileImage.current.files[0]);
            // 3 - Generate a public URL for the file
            const publicImageUrl = await getDownloadURL(newImageRef);
            // 4 - Update the photo placeholder with the image's URL.
            await updateProfile(user, {
                photoURL: publicImageUrl
            })
            await updateDoc(docRef1, {
                photoURL: publicImageUrl,
                storageUri: fileSnapshot.metadata.fullPath
            });
            setIsSuccessProfile(true);

            setTimeout(() => {
                setIsLoadingPhotoProfile(false);
            }, 3000)
        } catch (error) {
            setErrorState(error);
            setIsLoadingPhotoProfile(false);
        } finally {
           setTimeout(() => {
                setIsSuccessProfile(false);
                setIsLoadingPhotoProfile(false);
                setErrorState(null);
            }, 3000)
        }
    }
    const valueUser = useMemo(() => ({
        isLoadingProfile, isLoadingPhotoProfile, updateNameProfileUser, isSuccesProfile, errorState, updatePhotoProfileUser
    }), [errorState, isLoadingPhotoProfile, isLoadingProfile, isSuccesProfile]);


return valueUser;
}

