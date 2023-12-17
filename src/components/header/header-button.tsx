import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, useLocation } from "react-router-dom";
import { HeaderButton, HeaderButtonActiveCompose } from '../app/getDesignTokens';

;

export default function GroupHeaderButtons() {
    let location = useLocation();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <ButtonGroup size="small" aria-label="small button group">
                <Link to={'board-tasks'}>{location?.pathname === '/board-tasks'
                    ? <HeaderButtonActiveCompose variant="contained" key={"one"}>Доска</HeaderButtonActiveCompose>
                    : < HeaderButton sx={{ borderRight: 'none' }} variant="contained" key={"two"}>Доска</ HeaderButton>}</Link>
                <Link to={'list-tasks'}>{location?.pathname === '/list-tasks'
                    ? <HeaderButtonActiveCompose variant="contained" key={"two"}>Список</HeaderButtonActiveCompose>
                    : < HeaderButton variant="contained" key={"two"}>Список</ HeaderButton>}</Link>
            </ButtonGroup>
        </Box>
    );
}
