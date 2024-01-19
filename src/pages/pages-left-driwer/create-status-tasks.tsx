import { useState } from "react";
import { IOnChangeEvent } from "../../utils/types";
import { FieldCreateFireBase } from "../../components/field-create/field-create-firebase";
import { DivOverflow, ItemGrid, SenterBox } from "../../constants/constant-mui";
import { Box, List, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useStatus } from "../../hooks/use-statuse";

export const CreateStatusTask = () => {
    const [status, setStatus] = useState("");
    const { addStatus, statusListFB, deleteStatus } = useStatus();

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
        }]




    return (
        <>
            <FieldCreateFireBase arrayField={arrayField} />
            <ItemGrid xl={6} md={6} sm={12} sx={{
                gap: "10px", padding: '20px'
            }}>
                <DivOverflow>
                    <SenterBox><h2>Список статусов</h2></SenterBox>
                    <List >
                        {statusListFB && statusListFB.map((item: { name: string, _id: string },
                            i: number) =>
                            <Box key={i} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <ListItem >{item.name}</ListItem>
                                <DeleteIcon sx={{ color: '#0582a1' }} fontSize='small' onClick={() => handleDeleteStatus(item._id)} />
                            </Box>
                        )}
                    </List>
                </DivOverflow>
            </ItemGrid>
        </>

    )
}
