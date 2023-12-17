import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { ItemBackground } from '../components/app/getDesignTokens';



export const BoardTasks = () => {
    return (

        <Grid container xs={12} spacing={1} justifyContent="center">
            <Grid xl={2} md={2} xs={12} sm={6}>
                <ItemBackground>xs=8</ItemBackground>
            </Grid>
            <Grid xl={2} md={2} xs={12} sm={6}>
                <ItemBackground>xs=4</ItemBackground>
            </Grid>
            <Grid xl={2} md={2} xs={12} sm={6}>
                <ItemBackground>xs=8</ItemBackground>
            </Grid>
            <Grid xl={2} md={2} xs={12} sm={6}>
                <ItemBackground>xs=4</ItemBackground>
            </Grid>
            <Grid xl={2} md={2} xs={12} sm={6}>
                <ItemBackground>xs=8</ItemBackground>
            </Grid>
        </Grid>
    )
}
