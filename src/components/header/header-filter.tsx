import * as React from 'react';
import { FunctionComponent } from "react";
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import { BoldTextLeft, HeaderButtonFilters, OverflowFilter } from '../../constants/constant-mui';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { IChecked } from '../../utils/types';
import { setFilterDirection, setFilterExecutor, setFilterStatus } from '../../servises/actions/filter-data-actions';
import Modal from '../modal/modal';
import { set } from 'date-fns';
import { useDirections } from '../../hooks/use-direction';



export interface IFilterInterface {
    ref: string;
    name: string;
}
const MenuItemNew = styled(MenuItem)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.contrastText,
    },

}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.background.default,
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.text.primary,
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const HeaderFilter: FunctionComponent = () => {
    const { directionsListFB } = useDirections();

    const dispatch = useAppDispatch();
    const statuseList = useAppSelector(state => state.dataLists.statuseList);
    const directionsList = useAppSelector(state => state.dataLists.directionsList);
    const usersList = useAppSelector(state => state.dataLists.usersList);
    const [checkedStatuseList, setCheckedStatuseList] = React.useState<any>([{}]);
    const [checkedDirectionsList, setCheckedDirectionsList] = React.useState<any>([{}]);
    const [checkedExecutorList, setCheckedExecutorList] = React.useState<any>([{}]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);


    const setFunction = React.useCallback(() => {
        let statuseData: React.SetStateAction<any> = [];
        let directionsData: React.SetStateAction<any> = [];
        let executorData: React.SetStateAction<any> = [];
        if (statuseList && statuseList.length > 0 && directionsListFB.length > 0 && usersList.length > 0) {
            statuseData = statuseList && statuseList.map((statuse: any) => (statuse = { name: statuse.name, id: statuse.ref, checked: false }));
            directionsData = directionsListFB.map((directions: any, i: number) => (directions = { name: directions.name, id: i, checked: false }));
            executorData = usersList.map((executor: any) => (executor = { name: executor.name, id: executor.ref, checked: false }));
            setCheckedStatuseList(statuseData);
            setCheckedDirectionsList(directionsData);
            setCheckedExecutorList(executorData);
        }
    }, [directionsListFB, statuseList, usersList]);

    const open = Boolean(anchorEl);
    const handleClickButton = () => {
        setIsOpen(!isOpen);
        setFunction();
    }

    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setFunction();
    //     setAnchorEl(event.currentTarget);
    // };
    const handleClose = () => {
        setIsOpen(!isOpen);
        setAnchorEl(null);
    };
    const universalCheckedFunction = (universalSetCheckedList: any, dataCheked: any[], event: React.ChangeEvent<HTMLInputElement>) => {
        universalSetCheckedList([...dataCheked.map((item: IChecked) => {
            if (item.name === event.target.name && item.id === event.target.id) {
                return { name: item.name, id: item.id, checked: !item.checked }
            }
            return item;
        }
        )]);
    };

    const handleChangeStatuseList = (event: React.ChangeEvent<HTMLInputElement>) => {
        universalCheckedFunction(setCheckedStatuseList, checkedStatuseList, event);

    };
    const handleChangeDirectionsList = (event: React.ChangeEvent<HTMLInputElement>) => {
        universalCheckedFunction(setCheckedDirectionsList, checkedDirectionsList, event);
    };
    const handleChangeExecutorList = (event: React.ChangeEvent<HTMLInputElement>) => {
        universalCheckedFunction(setCheckedExecutorList, checkedExecutorList, event);

        // setCheckedExecutorList([...checkedExecutorList.map((item: IChecked) => {
        //     if (item.name === event.target.name && item.id === event.target.id) {
        //         return { name: item.name, id: item.id, checked: !item.checked }
        //     }
        //     return item;
        // }
        // )]);
    };

    React.useEffect(() => {

        let status: any = [];
        let executor: any = [];
        let direction: any = [];
        if (checkedStatuseList.length > 0) {
            status = checkedStatuseList.filter((item: IChecked) => item.checked === true).map((item: IChecked) => item.name);
            dispatch(setFilterStatus(status));
        };
        if (checkedExecutorList.length > 0) {
            executor = checkedExecutorList.filter((item: IChecked) => item.checked === true).map((item: IChecked) => item.name);
            dispatch(setFilterExecutor(executor));
        };
        if (checkedDirectionsList.length > 0) {
            direction = checkedDirectionsList.filter((item: IChecked) => item.checked === true).map((item: IChecked) => item.name);
            dispatch(setFilterDirection(direction));
        };
    }, [checkedDirectionsList, checkedExecutorList, checkedStatuseList, dispatch]);


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <HeaderButtonFilters
                id="customized-button"
                aria-controls={open ? 'customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClickButton}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Фильтры
            </HeaderButtonFilters>

            {isOpen && (<Modal onClose={handleClose} overlay={true} >
                <OverflowFilter>
                    <Box
                        id="customized-menu"
                    >
                        <BoldTextLeft>Статус</BoldTextLeft>
                        {statuseList.length > 0 && statuseList.map((statuse: IFilterInterface, i) => {
                            return (
                                <MenuItemNew disableRipple key={i} >
                                    <Checkbox
                                        checked={checkedStatuseList.checked}
                                        onChange={(e) => handleChangeStatuseList(e)}
                                        {...label}
                                        color="default"
                                        name={statuse.name}
                                        id={statuse.ref}
                                    />
                                    {statuse.name}
                                </MenuItemNew>
                            )
                        })}
                        <BoldTextLeft>Направление</BoldTextLeft>
                        {directionsListFB.length > 0 && directionsListFB.map((directions: IFilterInterface, i: number) => {
                            return (
                                <MenuItemNew disableRipple key={i}>
                                    <Checkbox
                                        checked={checkedDirectionsList && checkedDirectionsList.filter((item: IChecked) => item.name === directions.name && item.id === directions.ref).checked}
                                        onChange={e => handleChangeDirectionsList(e)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name={directions.name}
                                        id={directions.ref}
                                        color="secondary"
                                    />
                                    {directions.name}
                                </MenuItemNew>
                            )
                        })}
                        {/* <Divider sx={{ my: 0.5 }} /> */}
                        <BoldTextLeft>Исполнитель</BoldTextLeft>
                        {usersList.length > 0 && usersList.map((executor: IFilterInterface, i) => {
                            return (
                                <MenuItemNew disableRipple key={i}>
                                    <Checkbox
                                        color="secondary"
                                        checked={checkedExecutorList && checkedExecutorList.filter((item: IChecked) => item.name === executor.name && item.id === executor.ref).checked}
                                        onChange={e => handleChangeExecutorList(e)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name={executor.name}
                                        id={executor.ref}
                                    />
                                    {executor.name}
                                </MenuItemNew>
                            )
                        })}

                        <BoldTextLeft>Создатель</BoldTextLeft>
                        <MenuItemNew disableRipple>
                            <Checkbox
                                color="secondary"
                                // checked={checked}
                                // onChange={e => handleChange(e, i)}

                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            Динамический чел/хз как его вставить
                        </MenuItemNew>

                    </Box>
                </OverflowFilter>
            </Modal>)}



        </Box>
    );
};

export default HeaderFilter;
