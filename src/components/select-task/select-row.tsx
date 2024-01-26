import { FunctionComponent } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { IProfile } from "../../utils/types";
import { styled } from "@mui/material";

export const SelectDiv = styled('select')(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? 'rgb(28, 32, 37)' : theme.palette.background.default,
    color: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.contrastText,
    ...theme.typography.body2,
    height: '50px',
    width: '100%',
    border: 'none',
    borderRadius: '5px',
    padding: '0 1em 0 1em',
    outline: 'none',
    cursor: 'pointer',
}));

export interface IDirectionsTasksInterface {
    valueState: string;
    ariaLabel: string;
    name: string;
    id: string;
    value?: any;
    onChange: (event: { target: { value: string; }; }) => void;
    data: IProfile[];
    nameOption: string;
    stateStyleBolean: boolean
}

export const SelectRow: FunctionComponent<IDirectionsTasksInterface> = ({ data,
    nameOption,
    onChange,
    valueState,
    ariaLabel,
    name,
    id,
    stateStyleBolean }) => {

    return (
        // в значение value тега option добавляю id пользователя - по которому буду отображать исполнителя,
        //  а на экране имя отображаю. Так сделано со всеми options

        <Grid xs={12}>
            <SelectDiv
                aria-label={ariaLabel}
                style={stateStyleBolean && stateStyleBolean ? { border: "2px dashed red", borderRadius: "7px" } : undefined}
                value={valueState}
                onChange={onChange}
                name={name} id={id} >
                <option defaultValue={nameOption}>{nameOption}</option>
                {data && data.map((item: any) => {
                    return (
                        <option
                            key={item._id}
                            value={item._id}
                        >
                            {item.displayName ? item.displayName : item.name}
                        </option>
                    )
                })}
            </SelectDiv>
        </Grid>

    )
}
