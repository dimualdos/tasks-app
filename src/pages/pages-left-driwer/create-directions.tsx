import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../utils/fire-base";
import { IOnChangeEvent } from "../../utils/types";
import { FieldCreateFireBase } from "../../components/field-create/field-create-firebase";


export const CreateDirections = () => {


    const [direction, setDirection] = useState("");
    const [errorState, setErrorState] = useState<unknown | null>(null);

    const handleSubmitDirection = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await addDoc(collection(db, "direction"), {
                name: direction,
                profile: 'ID'
            });

        } catch (error) {
            setErrorState(error);
        } finally {
            removeFieldDirection();
            setTimeout(() => {
                setErrorState(null);
            }, 5000)
        }
    };
    const removeFieldDirection = () => {
        setDirection("");
    };

    const arrayField = [
        {
            h2Data: "Создать направление",
            onSubmit: handleSubmitDirection,
            idForm: "outlined-direction-form",
            label: ["Введите направление"],
            valueMass: [direction],
            type: ["text"],
            idTextField: ["outlined-direction"],
            name: ['направление'],
            onChange: [(event: IOnChangeEvent) => {
                setDirection(event.target.value);
            }],
            removeField: removeFieldDirection,
            buttonText: "Создать направление",
        }]

    return (
        <FieldCreateFireBase arrayField={arrayField} />
    )
}