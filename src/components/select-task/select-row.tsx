import { FunctionComponent } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import styles from './select-row.module.css';


export interface IDiectionsInterface {
    directionState: string;
    ariaLabel: string;
    name: string;
    id: string;
    //  value: any;
    onChange: (event: { target: { value: string; }; }) => void;
    data: [];
    nameOption: string;
    stateStyleBolean: boolean
}

export const SelectRow: FunctionComponent<IDiectionsInterface> = ({ data,
    nameOption,
    onChange,
    directionState,
    ariaLabel,
    name,
    id,
    stateStyleBolean }) => {
    return (
        <>
            <Grid container xs={3}
            >
                <select
                    aria-label={ariaLabel}
                    className={styles.selectDiv}
                    style={stateStyleBolean && stateStyleBolean ? { border: "2px dashed red", borderRadius: "7px" } : undefined}

                    value={directionState}
                    onChange={onChange}
                    // onChange={(event) => setDirection(event.target.value)}
                    name={name} id={id} >
                    <option className={styles.optionDiv} >{nameOption}</option>
                    {data.map((item: any) => {
                        return (
                            <option className={styles.optionDiv} key={item.ref} value={item.ref}>{item.name}</option>
                        )
                    })}
                </select>
            </Grid>
        </>
    )
}
