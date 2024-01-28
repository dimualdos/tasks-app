import { useState } from "react";
import { IOnChangeEvent } from "../../utils/types";
import { FieldCreateFireBase } from "../../components/field-create/field-create-firebase";
import { useAuth } from "../../hooks/hooks";


export const CreateUser = () => {
    const auth = useAuth();

    const [email, setEmail] = useState("");
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
    }
    ];

    return (
        <FieldCreateFireBase arrayField={arrayField} />
    )
}