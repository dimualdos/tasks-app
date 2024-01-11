import React, { FC, useState } from "react";
import Modal from "../modal/modal";
import EditIcon from '@mui/icons-material/Edit';
import { InputAdornments } from "../custom-input/custom-input";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Stack, Button } from '@mui/material';





export const JobTitleModal: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [jobUser, setJobUser] = useState('');
    const handleClickButton = () => {
        setIsOpen(!isOpen);
    }
    const handleClose = () => {
        setIsOpen(!isOpen);
    };
    const handleChangeJobUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobUser(e.target.value);
    }

    const updateJobUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // if (!user || !name.trim().length) return;
        // try {

        //     await updateDoc(docRef, {
        //         displayName: name
        //     });

        //     await updateProfile(user, {
        //         displayName: name
        //     })

        // } catch (error) {
        //     alert(error);
        // } finally {
        //     removeFieldUser();
        // }

    };
    const removeFieldUser = () => {
        setJobUser('');
    }


    return (
        <Box  >
            <EditIcon fontSize="small" onClick={handleClickButton} />
            {isOpen && <Modal onClose={handleClose} overlay={true}>
                <Grid container
                    spacing={2}
                    sx={{
                        padding: '20px',
                        display: 'flex',
                        justifyContent: 'center'
                    }} xs={12}
                >
                    <Grid sx={{ textAlign: 'center' }}>
                        <h2>Изменить должность</h2>
                    </Grid>


                    <form
                        onSubmit={updateJobUser}>
                        <Grid sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            minWidth: '300px',
                        }} xs={12}>
                            <InputAdornments
                                placeholderInput="Введите должность"
                                valueInput={jobUser}
                                nameInput="job"
                                typeInput="text"
                                onChangeInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeJobUser(e)}
                                ariaLabelInput="job"
                            />
                            <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    type='submit'
                                    size="small"
                                >
                                    изменить
                                </Button>
                            </Stack>
                        </Grid>
                    </form>
                </Grid>
            </Modal >}
        </Box >
    )
}

