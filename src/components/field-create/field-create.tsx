import { FormEvent, FunctionComponent, SyntheticEvent } from "react";
import { HeaderButton, HeaderButtonActive, ItemGrid } from "../../constants/constant-mui";
import { Box, TextField } from "@mui/material";
import { IOnChangeEvent } from "../../utils/types";


export interface IFieldCreate {
    h2Data: string;
    idForm: string;
    onSubmit: { (event: React.FormEvent<HTMLFormElement>): Promise<void> };
    labelOne: string;
    labelTwo?: string;
    valueOne: string;
    valueTwo?: string;
    idTextFieldOne: string;
    idTextFieldTwo?: string;
    onChange: any;
    onInput?: any;
    removeField: () => void;
    buttonText: string;
    type1?: string;
    type2?: string;
}


export const FieldCreate: FunctionComponent<IFieldCreate> = ({ h2Data,
    onSubmit,
    idForm,
    type1,
    type2,
    labelOne,
    labelTwo,
    valueOne,
    valueTwo,
    idTextFieldOne,
    idTextFieldTwo,
    onChange,
    onInput,
    // onChangeTwoTextField,
    removeField,
    buttonText }) => {

    return (
        <ItemGrid xl={6} md={6} sm={12} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
                <h2 >{h2Data}</h2>
            </Box>
            <form
                onSubmit={onSubmit}
                method="post"
                id={idForm} >
                <Box
                    sx={{
                        '& > :not(style)': { m: 1, width: '98%' },
                    }}
                >
                    <TextField
                        id={idTextFieldOne}
                        label={labelOne}
                        variant="filled"
                        value={valueOne}
                        onChange={onChange}
                        type={type1}
                    />
                    {labelTwo && labelTwo ? (<TextField
                        id={idTextFieldTwo}
                        label={labelTwo}
                        variant="filled"
                        value={valueTwo}
                        type={type2}
                        onInput={onInput}
                    />) : null}
                </Box>

                <Box sx={{ mb: 1, mr: 1, display: 'flex', justifyContent: 'right', gap: '20px', marginTop: '1em' }}>
                    <HeaderButton
                        variant="contained"
                        size="small"
                        type="button"
                        onClick={removeField}
                    >
                        Очистить поля
                    </HeaderButton>
                    <HeaderButtonActive
                        variant="contained"
                        size="small"
                        type="submit"
                    >
                        {buttonText}
                    </HeaderButtonActive>
                </Box>
            </form>
        </ItemGrid>
    );
}


//!! старый код
{/* <ItemGrid xl={6} md={6} sm={12} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
                    <h2 >Создать пользователя</h2>
                </Box>
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    id="outlined-controlled-form" >
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '98%' },
                        }}
                    >
                        <TextField
                            id="outlined-name"
                            label="Введите имя"
                            variant="filled"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                        <TextField
                            id="outlined-email"
                            label="Введите почту"
                            variant="filled"
                            value={email}
                            type="email"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 1, mr: 1, display: 'flex', justifyContent: 'right', gap: '20px', marginTop: '1em' }}>
                        <HeaderButton
                            variant="contained"
                            size="small"
                            type="button"
                            onClick={removeFieldUSer}
                        // endIcon={<SendIcon />}
                        >
                            Очистить поля
                        </HeaderButton>
                        <HeaderButtonActive
                            variant="contained"
                            size="small"
                            type="submit"
                        // endIcon={<SendIcon />}
                        >
                            Создать пользователя
                        </HeaderButtonActive>
                    </Box>
                </form>
            </ItemGrid> */}
