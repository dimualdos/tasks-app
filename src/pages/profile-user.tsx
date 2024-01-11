import React, { FC, ChangeEvent, useRef } from "react";
import { FieldCreateFireBase } from "../components/field-create/field-create-firebase";
import { auth } from "../utils/fire-base";
import { IOnChangeEvent } from "../utils/types";
import { Avatar, Box, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { H2Theme, H3Theme, HeaderButton, HeaderButtonActive, ItemGrid, ItemTaskOverflow } from "../constants/constant-mui";
import { useState } from "react";
import { useProfile } from "../hooks/use-profile";
import { useUpdateProfileUsers } from "../hooks/use-profile-update";

const InputElement = styled('input')(
    ({ theme }) => `
 
  padding: 8px 12px;
  outline: 0;
`,
);


export const ProfileUser: FC = () => {
    const user = auth.currentUser;
    const { profile } = useProfile();
    // const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    // const [password, setPassword] = useState("");
    const [filePhoto, setFilePhoto] = useState<any>();
    const fileInput = useRef<any>(null);
    const { isLoadingProfile, updateNameProfileUser, isSuccesProfile, isLoadingPhotoProfile, errorState, updatePhotoProfileUser } = useUpdateProfileUsers();


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFilePhoto(e.target.files[0]);
        }
    };

    const updatePhotoUser = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!user || !filePhoto || !auth) return;
        updatePhotoProfileUser(fileInput)
        removeFildePhoto();
    }

    const updateNameUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user || !name.trim().length) return;
        updateNameProfileUser(name);
        setTimeout(() => {
            removeFieldUser();
        }, 3000)
    };

    // const updateEmailUser = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (!user || !email.trim().length) return;
    //     const success = await updateEmail(email);
    //     if (success) {
    //         alert('Updated email address');
    //     }
    //     removeFieldUser();

    // };
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
        // setEmail('');
        // setPassword('');
    }
    const removeFildePhoto = () => {
        setFilePhoto(null);
        fileInput.current.value = null;
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
            isLoading: isLoadingProfile,
        },
        // {
        //     h2Data: "Изменить почту",
        //     onSubmit: updateEmailUser,
        //     idForm: 'id-email',
        //     label: ["Введите почту"],
        //     type: ["email"],
        //     valueMass: [email],
        //     idTextField: ["email"],
        //     name: ["email"],
        //     onChange: [(event: IOnChangeEvent) => {
        //         setEmail(event.target.value);
        //     }],
        //     removeField: removeFieldUser,
        //     buttonText: "Изменить почту",
        //     isLoading: isLoadingProfile,
        // },
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
            {/* {isLoading ? <p>Loading...</p> : null}
            {isSucces ? <p>Изменения сохранены!</p> : null} */}
            {profile! && profile._id ? (
                <Grid container display={"flex"} flexDirection={"column"} alignItems="center" xs={12}>
                    <H2Theme>Ваш профиль</H2Theme>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center', justifyContent: 'center' }} xs={12}>
                        <Box sx={{ gap: '5px', display: 'flex', alignItems: 'center' }}>
                            <Avatar alt="фото пользователя" src={profile.photoURL} />
                            <H3Theme>{profile && profile.displayName ? profile.displayName : "нет имени"}</H3Theme>
                        </Box>
                        <H3Theme>Почта: {profile ? profile.email : 'нет почты'}</H3Theme>
                    </Grid>
                    <Box sx={{
                        color: (theme) =>
                            theme.palette.mode === "dark" ?
                                theme.palette.primary.contrastText :
                                theme.palette.primary.main,
                        mb: '20px'
                    }}>
                        {isSuccesProfile ? 'Данные обновлены' : 'Вы можете изменить имя или обновть фото'}
                    </Box>


                    <Grid sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center' }} xs={12}>
                        {/* обновление данных профиля */}
                        <FieldCreateFireBase arrayField={arrayField} />

                        {/* обговление фото профиля */}
                        <ItemGrid xl={6} md={6} sm={12} sx={{ p: 2 }} >
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                                <h2 >Обновить фото профиля</h2>
                            </Box>
                            <form onSubmit={updatePhotoUser}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', text: 'center', m: 1, }}>
                                    <label >
                                        <InputElement sx={{ borderRadius: '15px' }}
                                            name="img"
                                            type={"file"}
                                            // id='id-img-input'
                                            ref={fileInput}
                                            onChange={handleFileChange}
                                        />

                                    </label>
                                </Box>

                                <Box sx={{ mb: 1, mr: 1, display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '1em' }}>
                                    <HeaderButton
                                        variant="contained"
                                        size="small"
                                        type="reset"
                                        onClick={removeFildePhoto}
                                    >
                                        Очистить поле
                                    </HeaderButton>
                                    <HeaderButtonActive disabled={isLoadingPhotoProfile} type="submit">{isLoadingPhotoProfile ? 'Идет отправка' : 'Обновить фото'}</HeaderButtonActive>
                                </Box>
                                {errorState ? <p>{`${errorState}`}</p> : null}
                            </form>
                        </ItemGrid>
                    </Grid>
                </Grid>
            ) : null}

        </ItemTaskOverflow>
    );
}




