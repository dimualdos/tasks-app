import React, { FC, useRef, ChangeEvent } from "react";

import { FieldCreateFireBase } from "../components/field-create/field-create-firebase";
import { auth, db } from "../utils/fire-base";
import { IOnChangeEvent } from "../utils/types";
import { Avatar, Box, Input } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { doc, updateDoc } from "firebase/firestore";
import { H1Theme, H3Theme, ItemTaskOverflow } from "../constants/constant-mui";
import { useState } from "react";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updateProfile } from "firebase/auth";
import { useUpdateEmail } from 'react-firebase-hooks/auth';


export const ProfileUser: FC = () => {
    // const userData = useAuth();
    const user = auth.currentUser;
    // const { profile } = useProfile();
    const fileInput = useRef<HTMLDivElement>();
    const [updateEmail, updating, error] = useUpdateEmail(auth);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (updating) {
        return <p>Updating...</p>;
    }
    const updatePhotoUser = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!user) return;
        // console.log(fileInput.current.files[0].name)
        const docRef = doc(db, "users", `${user?.uid}`);

        await updateDoc(docRef, {
            photoURL: "kjbn"
        });
        // await updateProfile(user, {
        //     photoURL: file 
        // })
    }
    const updateNameUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user || !name.trim().length) return;
        try {
            const docRef = doc(db, "users", `${user?.uid}`);

            await updateDoc(docRef, {
                displayName: name
            });

            await updateProfile(user, {
                displayName: name
            })

        } catch (error) {
            alert(error);
        } finally {
            removeFieldUser();
        }

    };

    const updateEmailUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user || !email.trim().length) return;
        const success = await updateEmail(email);
        if (success) {
            alert('Updated email address');
        }
        removeFieldUser();

    };
    // const updatePasswordUser = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (!user) return;
    //     updatePassword(user, dataForm).then(() => {
    //         console.log(`Pass updated! ${dataForm}`);
    //     }).catch((error) => {
    //         console.log(`An error Pass ${error}`);

    //     });
    //     removeFieldUSer();
    // };


    const removeFieldUser = () => {
        setName('');
        setEmail('');
        setPassword('');
    }
    const arrayField = [
        {
            h2Data: "Изменить имя",
            onSubmit: updateNameUser,
            idForm: 'id-user',
            label: ["Введите имя"],
            type: ["text"],
            valueMass: [name],
            idTextField: ["name"],
            name: ["name"],
            onChange: [(event: IOnChangeEvent) => {
                setName(event.target.value);
            }],
            removeField: removeFieldUser,
            buttonText: "Изменить имя",
        },
        {
            h2Data: "Изменить почту",
            onSubmit: updateEmailUser,
            idForm: 'id-email',
            label: ["Введите почту", "Выберите фото"],
            type: ["email"],
            valueMass: [email],
            idTextField: ["email"],
            name: ["email"],
            onChange: [(event: IOnChangeEvent) => {
                setEmail(event.target.value);
            }],
            removeField: removeFieldUser,
            buttonText: "Изменить почту",
        },
        // {
        //     h2Data: "Изменить пароль",
        //     onSubmit: updatePasswordUser,
        //     idForm: 'id-pass',
        //     label: ["Введите пароль"],
        //     type: ["text"],
        //     valueMass: [dataForm.password],
        //     idTextField: ["password"],
        //     name: "password",
        //     onChange: [(event: IOnChangeEvent) => {
        //         setDataForm(event.target.value);
        //     }],
        //     removeField: removeFieldUSer,
        //     buttonText: "Изменить пароль",
        // }
    ];

    return (
        <ItemTaskOverflow>
            {/* {isLoading ? <p>Loading...</p> : null} */}
            {/* {isSucces ? <p>Изменения сохранены!</p> : null} */}
            {user! && user!.uid ? (
                <Grid container display={"flex"} flexDirection={"column"} alignItems="center" xs={12}>

                    <Grid sx={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center', justifyContent: 'center' }} xs={12}>
                        <Box sx={{ gap: '5px', display: 'flex', alignItems: 'center' }}>
                            <Avatar alt="фото пользователя" src={user!.photoURL!} />
                            <H3Theme>{user! && user.displayName ? user.displayName : "нет имени"}</H3Theme>
                        </Box>
                        <H3Theme>Почта: {user ? user.email : 'нет почты'}</H3Theme>
                    </Grid>

                    <H1Theme>Ваш профиль</H1Theme>
                    <Grid sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center' }} xs={12}>
                        <FieldCreateFireBase arrayField={arrayField} />
                        <form onSubmit={updatePhotoUser}>
                            <label>
                                Выберите фото:
                                <Input
                                    type={"file"}
                                    onChange={handleFileChange}
                                />
                            </label>
                            <button type="submit">Сохранить</button>
                        </form>
                    </Grid>
                </Grid>
            ) : null}

        </ItemTaskOverflow>


    );
}


