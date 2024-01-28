import React, { FC, useState } from "react";
import Modal from "../modal/modal";
import EditIcon from '@mui/icons-material/Edit';
import { InputAdornments } from "../custom-input/custom-input";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Stack, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Alert } from '@mui/material';
import { useAuth } from "../../hooks/hooks";
import { useJobTitle } from "../../hooks/use-job-title";
import { ItemGrid } from "../../constants/constant-mui";
import { id } from "date-fns/locale";



interface IIdUsers {
    idUser: string | null,
}

// Модальное окно со списками активных должностей

export const JobTitleModal: FC<IIdUsers> = (idUserList) => {
    const { updateJobUser, activeJobTitle, isSuccesJob, errorState } = useJobTitle(idUserList.idUser);
    const [isOpen, setIsOpen] = useState(false);
    const [jobUser, setJobUser] = useState('');


    const handleClickButton = () => {
        setIsOpen(!isOpen);
    }
    const handleClose = () => {
        setIsOpen(!isOpen);
    };
    const handleJobSelect = (event: SelectChangeEvent) => {
        setJobUser(event.target.value as string);
    };

    const handleUpdateJobUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateJobUser(jobUser);

        setTimeout(() => {
            removeFieldUser();
            setIsOpen(false)
        }, 1700);
    };
    const removeFieldUser = () => {
        setJobUser('');
    }


    return (
        <Box  >
            <EditIcon sx={{ color: '#0582a1' }} fontSize="small" onClick={handleClickButton} />
            {isOpen && <Modal onClose={handleClose} overlay={true}>
                <Grid container
                    spacing={2}
                    sx={{
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: "column"
                    }} xs={12} md={12} xl={12} lg={12}
                >

                    <Box sx={{ textAlign: 'center' }}>
                        <h2>Изменить должность</h2>
                    </Box>

                    <form
                        onSubmit={handleUpdateJobUser}>
                        <Grid sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            minWidth: '300px',
                        }} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="jobUser-simple-select-label">Изменить должность</InputLabel>
                                <Select
                                    labelId="jobUser-simple-select-label"
                                    id="jobUser-simple-select"
                                    value={jobUser}
                                    label="Age"
                                    onChange={handleJobSelect}
                                >
                                    {activeJobTitle.map((item: { name: string }, i: number) => <MenuItem
                                        key={i} value={item.name}>{item.name}</MenuItem>)}
                                </Select>
                            </FormControl>
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


                    <Box>
                        {isSuccesJob ? <Alert severity="success">Должность изменена</Alert> : null}
                        {errorState ? <Alert severity="error">{`${errorState}`}</Alert> : null}
                    </Box>

                </Grid>
            </Modal >}
        </Box >
    )
}

