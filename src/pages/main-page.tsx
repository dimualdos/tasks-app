import { FunctionComponent, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { IOnChangeEvent } from "../utils/types";
import { FieldCreateNew } from "../components/field-create/field-create-new";
import { useAddDirectionMutation, useAddStatusMutation, useAddUserMutation } from "../servises/rtk-query/tasks-api";
import { ItemTaskOverflow } from "../constants/constant-mui";




export const MainPage: FunctionComponent = () => {
    const [addUserData] = useAddUserMutation();
    const [addDirectionData] = useAddDirectionMutation();
    const [addSatusData] = useAddStatusMutation();

    // const { statusMessage, errorMessage } = useAppSelector(state => state.tasksArray);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [direction, setDirection] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await addUserData({
            name: name,
            email: email,
        }).unwrap();
        setName("");
        setEmail("");
    }

    const removeFieldUSer = () => {
        setName("");
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
        onSubmit: handleSubmit,
        idForm: "outlined-controlled-form",
        label: ["Введите имя", "Введите почту"],
        valueMass: [name, email],
        type: ["text", "email"],
        idTextField: ["outlined-name", "outlined-email"],
        onChange: [(event: IOnChangeEvent) => {
            setName(event.target.value);
        }, (event: IOnChangeEvent) => {
            setEmail(event.target.value)
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
        idTextField: ["outlined-direction"],
        onChange: [(event: IOnChangeEvent) => {
            setStatus(event.target.value);
        }],
        removeField: removeFieldStatus,
        buttonText: "Создать статус",
    }]
    return (
        <ItemTaskOverflow>

            <Grid container display={"flex"} flexDirection={"column"} gap={"20px"} alignItems="center" xs={12}>
                {/* <FieldCreate
                    h2Data="Создать пользователя"
                    onSubmit={handleSubmit}
                    idForm={"outlined-controlled-form"}
                    labelOne={"Введите имя"}
                    labelTwo={"Введите почту"}
                    valueOne={name}
                    valueTwo={email}
                    type1="text"
                    type2="email"
                    idTextFieldOne={"outlined-name"}
                    idTextFieldTwo={"outlined-email"}
                    onChange={(event: IOnChangeEvent) => {
                        setName(event.target.value);
                    }}

                    onInput={(event: IOnChangeEvent) => {
                        setEmail(event.target.value);
                    }}
                    removeField={removeFieldUSer}
                    buttonText={"Создать пользователя"} />

                <FieldCreate
                    h2Data="Создать направление"
                    onSubmit={handleSubmitDirection}
                    idForm={"outlined-direction-form"}
                    labelOne={"Введите направление"}
                    valueOne={direction}
                    type1="text"
                    idTextFieldOne={"outlined-direction"}
                    onChange={(event: IOnChangeEvent) => {
                        setDirection(event.target.value);
                    }}
                    removeField={removeFieldDirection}
                    buttonText={"Создать направление"} />

                <FieldCreate
                    h2Data="Создать статус"
                    onSubmit={handleSubmitStatus}
                    idForm={"outlined-status-form"}
                    labelOne={"Введите статус"}
                    valueOne={status}
                    type1="text"
                    idTextFieldOne={"outlined-status"}
                    onChange={(event: IOnChangeEvent) => {
                        setStatus(event.target.value);
                    }}
                    removeField={removeFieldStatus}
                    buttonText={"Создать статус"} /> */}

                {/* компонент с передачей массива данных вместо создания каждого отдельного компоненте с данными
заодно решил проблему с onInput и onChange и использовать одинаковые компоненты и обработчики */}
                <FieldCreateNew arrayField={arrayField} />
            </Grid>
        </ItemTaskOverflow>

    );

};


