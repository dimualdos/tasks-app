import { useState } from "react";
import { IOnChangeEvent } from "../../utils/types";
import { FieldCreateFireBase } from "../../components/field-create/field-create-firebase";
import { DivOverflow, ItemGrid, SenterBox } from "../../constants/constant-mui";
import { useJobTitle } from "../../hooks/use-job-title";
import { Alert, Box, List, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import Grid2 from "@mui/material/Unstable_Grid2";
import RestoreIcon from '@mui/icons-material/Restore';





export const CreateJobTitle = () => {
    const { updateJobUsersList, archiveJob, updateArchiveUsersJob, restoreActiveUsersJob, activeJobTitle, deleteJobTitle } = useJobTitle()
    const [job, setJob] = useState("");
    const [errorState, setErrorState] = useState<unknown | null>(null);

    const handleSubmitDirection = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateJobUsersList(job);
        removeFieldDirection();
    };
    const removeFieldDirection = () => {
        setJob("");
    };
    const handleDeleteJobTitle = (id: string) => {
        deleteJobTitle(id)
    };
    const handleArchiveJobTitle = (id: string) => {
        updateArchiveUsersJob(id)
    };
    const restoreActiveUsersJobTitle = (id: string) => {
        restoreActiveUsersJob(id)
    };

    const arrayField = [
        {
            h2Data: "Создать должность",
            onSubmit: handleSubmitDirection,
            idForm: "outlined-direction-form",
            label: ["Введите должность"],
            valueMass: [job],
            type: ["text"],
            idTextField: ["outlined-direction"],
            name: ['job'],
            onChange: [(event: IOnChangeEvent) => {
                setJob(event.target.value);
            }],
            removeField: removeFieldDirection,
            buttonText: "Создать должность",
        },
    ]

    return (
        <>
            <FieldCreateFireBase arrayField={arrayField} />

            <ItemGrid xl={6} md={6} sm={12} sx={{
                gap: "10px", padding: '20px'
            }}>
                <DivOverflow>
                    <SenterBox><h2>Список должностей</h2></SenterBox>
                    <List>
                        {activeJobTitle && activeJobTitle.map((item: { name: string, _id: string }, i: number) =>
                            <Box key={i} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <ListItem >{item.name}</ListItem>
                                <Grid2 xs={4} sx={{ display: 'flex', flexDirection: 'row', justifyContent: "end", flexWrap: 'nowrap', gap: '10px' }}>
                                    <>в архив</>
                                    <ArchiveIcon sx={{ color: '#0582a1' }} fontSize='small' onClick={() => handleArchiveJobTitle(item._id)} />
                                </Grid2>
                            </Box>
                        )}
                    </List>
                </DivOverflow>
            </ItemGrid >

            <ItemGrid xl={6} md={6} sm={12} sx={{
                gap: "10px", padding: '20px'
            }}>
                <DivOverflow>
                    <SenterBox><h2>Список архивных должностей</h2></SenterBox>
                    {archiveJob && archiveJob.length > 0 ? <Alert severity="info">
                        Внимание! Удаляя должность вы удалите её навсегда!
                    </Alert> : null}

                    <List >
                        {archiveJob && archiveJob.map((item: { name: string, _id: string },
                            i: number) =>
                            <Grid2 key={i} sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '10px'
                            }}>
                                <ListItem >{item.name}</ListItem>

                                <Box >Восстановить</Box>
                                <RestoreIcon name={'Восстановить'}
                                    sx={{ color: '#0582a1' }}
                                    fontSize='small' onClick={() => restoreActiveUsersJobTitle(item._id)} />

                                <Box >Удалить</Box>
                                <DeleteIcon name={'Удалить'}
                                    sx={{ color: '#0582a1' }}
                                    fontSize='small' onClick={() => handleDeleteJobTitle(item._id)} />
                            </Grid2>
                        )}
                    </List>
                </DivOverflow>
            </ItemGrid >
        </>
    )
}
