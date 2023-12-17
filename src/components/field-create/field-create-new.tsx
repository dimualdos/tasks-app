import { FunctionComponent } from "react";
import { HeaderButton, HeaderButtonActive, ItemGrid } from "../app/getDesignTokens";
import { Box, TextField } from "@mui/material";
import { IOnChangeEvent } from "../../utils/types";

interface IFieldObj {
    h2Data: string;
    idForm: string;
    onSubmit: { (event: React.FormEvent<HTMLFormElement>): Promise<void> };
    label: string[];
    valueMass: string[];
    type: string[];
    idTextField: string[];
    onChange: ((event: IOnChangeEvent) => void)[];
    removeField: () => void;
    buttonText: string;
}
export interface IFieldCreateNew {
    arrayField: IFieldObj[]
}

export const FieldCreateNew: FunctionComponent<IFieldCreateNew> = ({ arrayField }) => {
    const itemField = arrayField && arrayField.length > 0 ? (arrayField!.map((item, index) => {
        return (
            <ItemGrid xl={6} md={6} sm={12} sx={{ p: 2 }} key={index}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
                    <h2 >{item.h2Data}</h2>
                </Box>
                <form
                    onSubmit={item.onSubmit}
                    method="post"
                    id={item.idForm} >
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '98%' },
                        }}
                    >
                        {item.label.length > 1 ? (item.label.map((itemLabel: string, i: number) => {
                            return (
                                <TextField
                                    key={i}
                                    id={item.idTextField[i]}
                                    label={itemLabel}
                                    variant="filled"
                                    value={item.valueMass[i]}
                                    onChange={item.onChange[i]}
                                    type={item.type[i]}
                                />
                            )
                        })) : (
                            <TextField
                                id={item.idTextField[0]}
                                label={item.label[0]}
                                variant="filled"
                                value={item.valueMass[0]}
                                onChange={item.onChange[0]}
                                type={item.type[0]}
                            />
                        )}

                    </Box>

                    <Box sx={{ mb: 1, mr: 1, display: 'flex', justifyContent: 'right', gap: '20px', marginTop: '1em' }}>
                        <HeaderButton
                            variant="contained"
                            size="small"
                            type="button"
                            onClick={item.removeField}
                        >
                            Очистить поля
                        </HeaderButton>
                        <HeaderButtonActive
                            variant="contained"
                            size="small"
                            type="submit"
                        >
                            {item.buttonText}
                        </HeaderButtonActive>
                    </Box>
                </form>
            </ItemGrid>
        )
    }
    )) : (null);

    return (
        <>
            {itemField}
        </>
    )
}
