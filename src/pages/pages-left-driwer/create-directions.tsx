import { useState } from "react";
import { IOnChangeEvent } from "../../utils/types";
import { FieldCreateFireBase } from "../../components/field-create/field-create-firebase";
import { useDirections } from "../../hooks/use-direction";
import { DivOverflow, ItemGrid, SenterBox } from "../../constants/constant-mui";
import { Alert, Box, List, ListItem } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export const CreateDirections = () => {


    const [direction, setDirection] = useState("");
    const { addDirection, restoreDirection, directionsActive, deleteDirection, directionsArchive, updateDirectionArchive } = useDirections();
    // if (directionsListFB) console.log(directionsListFB)
    const handleSubmitDirection = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addDirection(direction);
        removeFieldDirection();
    }
    const removeFieldDirection = () => {
        setDirection("");
    };
    const handlemovDirectionArchive = (id: string) => {
        updateDirectionArchive(id)
    }

    const handleDeleteDirection = (id: string) => {
        deleteDirection(id)
    }

    const handleRestoreDirection = (id: string) => {
        restoreDirection(id)
    }
    const arrayField = [
        {
            h2Data: "Создать направление",
            onSubmit: handleSubmitDirection,
            idForm: "outlined-direction-form",
            label: ["Введите направление"],
            valueMass: [direction],
            type: ["text"],
            idTextField: ["outlined-direction"],
            name: ['direction'],
            onChange: [(event: IOnChangeEvent) => {
                setDirection(event.target.value);
            }],
            removeField: removeFieldDirection,
            buttonText: "Создать направление",
        }]

    return (
        <>
            <FieldCreateFireBase arrayField={arrayField} />
            <ItemGrid xl={6} md={6} sm={12} sx={{
                gap: "10px", padding: '20px'
            }}>
                <DivOverflow>
                    <SenterBox><h2>Список действующих направлений</h2></SenterBox>

                    <List >
                        {directionsActive && directionsActive.map((item: { name: string, _id: string },
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
                                    <Box>в архив</Box>
                                    <ArchiveIcon name={'отправить в архив'}
                                        sx={{ color: '#0582a1' }}
                                        fontSize='small' onClick={() => handlemovDirectionArchive(item._id)} />

                                </Grid2>
                            </Grid2>
                        )}
                    </List>
                </DivOverflow>
            </ItemGrid >

            <ItemGrid xl={6} md={6} sm={12} sx={{
                gap: "10px", padding: '20px'
            }}>
                <DivOverflow>
                    <SenterBox><h2>Список архивных направлений</h2></SenterBox>
                    {directionsArchive && directionsArchive.length > 0 ? <Alert severity="info">
                        Внимание! Удаляя направление вы удалите его навсегда!
                    </Alert> : null}
                    <List >
                        {directionsArchive && directionsArchive.map((item: { name: string, _id: string },
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
                                    fontSize='small' onClick={() => handleRestoreDirection(item._id)} />

                                <Box >Удалить</Box>
                                <DeleteIcon name={'Удалить'}
                                    sx={{ color: '#0582a1' }}
                                    fontSize='small' onClick={() => handleDeleteDirection(item._id)} />
                            </Grid2>
                        )}
                    </List>
                </DivOverflow>
            </ItemGrid >
        </>

    )
}
