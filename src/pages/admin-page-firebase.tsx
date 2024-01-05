import { FunctionComponent, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { IOnChangeEvent, IProfile } from "../utils/types";
import { useAddDirectionMutation, useAddStatusMutation, useAddUserMutation } from "../servises/rtk-query/tasks-api";
import { ItemTaskOverflow } from "../constants/constant-mui";
import { useAuth } from "../hooks/hooks";
import { FieldCreateFireBase } from "../components/field-create/field-create-firebase";
import { collection, limit, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../utils/fire-base";




export const AdminPage: FunctionComponent = () => {
    const auth = useAuth();

    const [addDirectionData] = useAddDirectionMutation();
    const [addSatusData] = useAddStatusMutation();
    // const { statusMessage, errorMessage } = useAppSelector(state => state.tasksArray);
    const [email, setEmail] = useState("");
    const [direction, setDirection] = useState("");
    const [status, setStatus] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email.trim().length || !password.trim().length) {
            alert("Заполните все поля");
            return
        }
        auth.register(email, password);
        removeFieldUSer()
    }

    const removeFieldUSer = () => {
        setPassword("");
        setEmail("");
    }

    const handleSubmitDirection = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await addDirectionData({
            name: direction,
        }).unwrap();
        setDirection("");
    }

    const removeFieldDirection = () => {
        setDirection("");
    }

    const handleSubmitStatus = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await addSatusData({
            name: status,
        }).unwrap();
        setStatus("");
    }

    const removeFieldStatus = () => {
        setStatus("");
    }
    const arrayField = [{
        h2Data: "Создать пользователя",
        onSubmit: handleSubmitRegister,
        idForm: "outlined-controlled-form",
        label: ["Введите почту", "Введите пароль"],
        valueMass: [email, password],
        type: ["email", "password"],
        idTextField: ["outlined-email", "outlined-password"],
        name: ['email', 'password'],
        onChange: [(event: IOnChangeEvent) => {
            setEmail(event.target.value);
        }, (event: IOnChangeEvent) => {
            setPassword(event.target.value);
        }],

        removeField: removeFieldUSer,
        buttonText: "Создать пользователя",
    },
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
    },
    {
        h2Data: "Создать статус",
        onSubmit: handleSubmitStatus,
        idForm: "outlined-status-form",
        label: ["Введите статус"],
        valueMass: [status],
        type: ["text"],
        idTextField: ["outlined-status"],
        name: ['статус'],
        onChange: [(event: IOnChangeEvent) => {
            setStatus(event.target.value);
        }],
        removeField: removeFieldStatus,
        buttonText: "Создать статус",
    }]
    return (
        <ItemTaskOverflow>
            <Grid container display={"flex"} flexDirection={"column"} gap={"20px"} alignItems="center" xs={12}>
                {/* компонент с передачей массива данных вместо создания каждого отдельного компоненте с данными
заодно решил проблему с onInput и onChange и использовать одинаковые компоненты и обработчики */}
                <FieldCreateFireBase arrayField={arrayField} />
            </Grid>
        </ItemTaskOverflow>

    );

};


