import { useState } from "react";
import { IOnChangeEvent } from "../../utils/types";
import { FieldCreateFireBase } from "../../components/field-create/field-create-firebase";
import { ItemGrid, SenterBox } from "../../constants/constant-mui";
import { useJobTitle } from "../../hooks/use-job-title";
import { Box, List, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';



export const CreateJobTitle = () => {
    const { updateJobUsersList, dataJobTitle, deleteJobTitle } = useJobTitle()
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
    }

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
                <SenterBox><h2>Список должностей</h2></SenterBox>
                <List>
                    {dataJobTitle && dataJobTitle.map((item: { name: string, _id: string }, i: number) =>
                        <Box key={i} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <ListItem >{item.name}</ListItem>
                            <DeleteIcon sx={{ color: '#0582a1' }} fontSize='small' onClick={() => handleDeleteJobTitle(item._id)} />
                        </Box>
                    )}
                </List>
            </ItemGrid >
        </>
    )
}