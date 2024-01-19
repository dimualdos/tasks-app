import { useState } from "react";
import { IOnChangeEvent } from "../../utils/types";
import { FieldCreateFireBase } from "../../components/field-create/field-create-firebase";
import { useDirections } from "../../hooks/use-direction";
import { DivOverflow, ItemGrid, SenterBox } from "../../constants/constant-mui";
import { Box, List, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export const CreateDirections = () => {


    const [direction, setDirection] = useState("");
    const { addDirection, directionsListFB, deleteDirection } = useDirections();
    // if (directionsListFB) console.log(directionsListFB)
    const handleSubmitDirection = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addDirection(direction);
        removeFieldDirection();
    }
    const removeFieldDirection = () => {
        setDirection("");
    };
    const handleDeleteDirection = (id: string) => {
        deleteDirection(id)
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
                    <SenterBox><h2>Список направлений</h2></SenterBox>
                    <List >
                        {directionsListFB && directionsListFB.map((item: { name: string, _id: string },
                            i: number) =>
                            <Box key={i} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <ListItem >{item.name}</ListItem>
                                <DeleteIcon sx={{ color: '#0582a1' }} fontSize='small' onClick={() => handleDeleteDirection(item._id)} />
                            </Box>
                        )}
                    </List>
                </DivOverflow>
            </ItemGrid>
        </>

    )
}