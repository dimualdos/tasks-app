import { FunctionComponent, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import styles from './select-row.module.css';
import { IProfile } from "../../utils/types";


export interface IDirectionsTasksInterface {
    directionState: string;
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
    directionState,
    ariaLabel,
    name,
    id,
    stateStyleBolean }) => {

    return (
        // в значение value тега option добавляю id пользователя - по которому буду отображать исполнителя,
        //  а на экране имя отображаю. Так сделано со всеми options

        <Grid xs={4}
        >
            <select
                aria-label={ariaLabel}
                className={styles.selectDiv}
                style={stateStyleBolean && stateStyleBolean ? { border: "2px dashed red", borderRadius: "7px" } : undefined}
                value={directionState}
                onChange={onChange}
                name={name} id={id} >
                <option className={styles.optionDiv} >{nameOption}</option>
                {data && data.map((item: any) => {
                    return (
                        <option className={styles.optionDiv}
                            key={item._id}
                            value={item._id}
                        >
                            {item.displayName ? item.displayName : item.name}
                        </option>
                    )
                })}
            </select>
        </Grid>

    )
}
