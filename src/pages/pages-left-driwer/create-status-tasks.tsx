import { useState } from "react";
import { IOnChangeEvent } from "../../utils/types";
import { FieldCreateFireBase } from "../../components/field-create/field-create-firebase";
import { DivOverflow, ItemGrid, SenterBox } from "../../constants/constant-mui";
import { Alert, Box, List, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useStatus } from "../../hooks/use-status";
import Grid2 from "@mui/material/Unstable_Grid2";
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';


// Компонент по созданию статусов создаёт активные статусы задач. 
// в базе данных хранятся активные статусы задач со статусом True
// когда статус перемещается в ахив то у статуса поле status обновляется на False
// статус можно удалить из базы данных
export const CreateStatusTask = () => {
    const [status, setStatus] = useState("");
    const { addStatus,
        deleteStatus,
        updateArchiveStatus,
        restoreActiveStatus,
        statusActive,
        statusArchive } = useStatus();

    const handleSubmitStatus = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addStatus(status);
        removeFieldStatus();
    }
    const removeFieldStatus = () => {
        setStatus("");
    };
    const handleDeleteStatus = (id: string) => {
        deleteStatus(id)
    }
    const handleArchiveStatus = (id: string) => {
        updateArchiveStatus(id)
    };
    const handleRestoreActiveStatus = (id: string) => {
        restoreActiveStatus(id)
    };

    const arrayField = [
        {
            h2Data: "Создать статус",
            onSubmit: handleSubmitStatus,
            idForm: "outlined-status-form",
            label: ["Введите статус"],
            valueMass: [status],
            type: ["text"],
            idTextField: ["outlined-status"],
            name: ['status'],
            onChange: [(event: IOnChangeEvent) => {
                setStatus(event.target.value);
            }],
            removeField: removeFieldStatus,
            buttonText: "Создать статус",
        }];

    return (
        <>
            <FieldCreateFireBase arrayField={arrayField} />
            <ItemGrid xl={6} md={6} sm={12} sx={{
                gap: "10px", padding: '20px'
            }}>
                <DivOverflow>
                    <SenterBox><h2>Список статусов</h2></SenterBox>
                    <List >
                        {statusActive && statusActive.map((item: { name: string, _id: string },
                            i: number) =>
                            <Grid2 key={i} sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <ListItem >{item.name}</ListItem>
                                <Grid2 xs={4} sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "end",
                                    flexWrap: 'nowrap',
                                    gap: '10px'
                                }}>
                                    <Box >В архив</Box>

                                    <ArchiveIcon
                                        name={'отправить в архив'}
                                        sx={{ color: '#0582a1' }}
                                        fontSize='small'
                                        onClick={() => handleArchiveStatus(item._id)} />
                                </Grid2>
                            </Grid2>
                        )}
                    </List>
                </DivOverflow>
            </ItemGrid>
            <ItemGrid xl={6} md={6} sm={12} sx={{
                gap: "10px", padding: '20px'
            }}>
                <DivOverflow>
                    <SenterBox><h2>Список архивных статусов</h2></SenterBox>
                    {statusArchive && statusArchive.length > 0 ? <Alert severity="info">
                        Внимание! Удаляя статус вы удалите его навсегда!
                    </Alert> : null}

                    <List >
                        {statusArchive && statusArchive.map((item: { name: string, _id: string },
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
                                    fontSize='small' onClick={() => handleRestoreActiveStatus(item._id)} />

                                <Box >Удалить</Box>
                                <DeleteIcon name={'Удалить'}
                                    sx={{ color: '#0582a1' }}
                                    fontSize='small' onClick={() => handleDeleteStatus(item._id)} />
                            </Grid2>
                        )}
                    </List>
                </DivOverflow>
            </ItemGrid >
        </>

    )
}
