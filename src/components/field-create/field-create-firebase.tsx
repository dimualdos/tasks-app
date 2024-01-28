import { FunctionComponent } from "react";
import { HeaderButton, HeaderButtonActive, ItemGrid } from "../../constants/constant-mui";
import { Box } from "@mui/material";
import { InputAdornments } from "../custom-input/custom-input";
import { IFieldCreateNew } from "../../utils/types";



export const FieldCreateFireBase: FunctionComponent<IFieldCreateNew> = ({ arrayField }) => {
    const itemField = arrayField && arrayField!.length > 0 ? (arrayField!.map((item, index) => {
        return (
            <ItemGrid xl={6} md={6} sm={12} sx={{ p: 2 }} key={index}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                    <h2 >{item.h2Data}</h2>
                </Box>
                <form
                    onSubmit={item.onSubmit}
                    id={item.idForm} >
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '98%' },
                        }}
                    >
                        {item && item!.label!.length > 1 ? (item!.label!.map((itemValue: string, i: number) => {
                            return (
                                <InputAdornments
                                    key={i}
                                    idInput={item.idTextField![i]}
                                    typeInput={item.type[i]}
                                    ariaLabelInput={item.label![i]}
                                    placeholderInput={item.label![i]}
                                    // variant="filled"
                                    valueInput={item.valueMass![i]}
                                    onChangeInput={item.onChange![i]}
                                    nameInput={item.name![i]}
                                />
                            )
                        })) : (
                            <InputAdornments
                                idInput={item.idTextField![0]}
                                typeInput={item.type[0]}
                                ariaLabelInput={item.label![0]}
                                placeholderInput={item.label![0]}
                                valueInput={item.valueMass![0]}
                                onChangeInput={item.onChange![0]}
                                nameInput={item.name![0]}
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
                            type={'submit'}
                            disabled={item.isLoading}
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
