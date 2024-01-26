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
import { IChecked, ITasksUser } from '../../utils/types';
import { setFilterDirection, setFilterExecutor, setFilterStatus } from '../../servises/actions/filter-data-actions';
import Modal from '../modal/modal';
import { set } from 'date-fns';
import { useDirections } from '../../hooks/use-direction';
import { useStatus } from '../../hooks/use-status';
import { useTaskList, useUsersList } from '../../hooks';



export interface IFilterInterface {
    name: string;
    _id: string;
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
    const { directionsActive } = useDirections();
    const { statusActive } = useStatus();
    const { tasksList } = useTaskList();
    const { usersListFB } = useUsersList();

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
        if ((tasksList && statusActive && directionsActive) &&
            (statusActive.length > 0 || directionsActive.length > 0 || tasksList.length > 0)) {
            statuseData = statusActive && statusActive.map((statuse: any) => (statuse = { name: statuse.name, id: statuse._id, checked: false }));
            directionsData = directionsActive.map((directions: any, i: number) => (directions = { name: directions.name, id: directions._id, checked: false }));
            executorData = usersList.map((executor: any) => (executor = { id: executor.executorTaskId, checked: false }));
            setCheckedStatuseList(statuseData);
            setCheckedDirectionsList(directionsData);
            setCheckedExecutorList(executorData);
        }
    }, [directionsActive, statusActive, tasksList, usersList]);

    const open = Boolean(anchorEl);
    const handleClickButton = () => {
        setIsOpen(!isOpen);
        setFunction();
    };

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
    const exec = tasksList && tasksList.length > 0 && tasksList.map((executor: ITasksUser, i) => {
        const executorName: any = usersListFB!.find((item: any) => item._id === executor.executorTaskId);

        return executorName
    });

    const exec1 = usersListFB && usersListFB.length > 0 && usersListFB.map((executor: any) => {
        const executorName: any = tasksList!.find((item: any) => item.executorTaskId === executor._id);

        return executorName
    })
    console.log(exec1);
    console.log(tasksList);
    console.log(usersListFB)

    React.useEffect(() => {

        let status: any = [];
        let executor: any = [];
        let direction: any = [];
        if (checkedStatuseList.length > 0) {
            status = checkedStatuseList.filter((item: IChecked) => item.checked === true).map((item: IChecked) => item);
            dispatch(setFilterStatus(status));
        };
        if (checkedExecutorList.length > 0) {
            executor = checkedExecutorList.filter((item: IChecked) => item.checked === true).map((item: IChecked) => item);
            dispatch(setFilterExecutor(executor));
        };
        if (checkedDirectionsList.length > 0) {
            direction = checkedDirectionsList.filter((item: IChecked) => item.checked === true).map((item: IChecked) => item);
            dispatch(setFilterDirection(direction));
            console.log(direction)

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
                        {statusActive.length > 0 && statusActive.map((statuse: IFilterInterface,) => {
                            return (
                                <MenuItemNew disableRipple key={statuse._id} >
                                    <Checkbox
                                        checked={checkedStatuseList.checked}
                                        onChange={(e) => handleChangeStatuseList(e)}
                                        {...label}
                                        color="secondary"
                                        name={statuse.name}
                                        id={statuse._id}
                                    />
                                    {statuse.name}
                                </MenuItemNew>
                            )
                        })}
                        <BoldTextLeft>Направление</BoldTextLeft>
                        {directionsActive.length > 0 && directionsActive.map((directions: IFilterInterface, i: number) => {
                            return (
                                <MenuItemNew disableRipple key={i}>
                                    <Checkbox
                                        checked={checkedDirectionsList && checkedDirectionsList.filter((item: IChecked) => item.name === directions.name && item.id === directions._id).checked}
                                        onChange={e => handleChangeDirectionsList(e)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name={directions.name}
                                        id={directions._id}
                                        color="secondary"
                                    />
                                    {directions.name}
                                </MenuItemNew>
                            )
                        })}
                        {/* <Divider sx={{ my: 0.5 }} /> */}
                        <BoldTextLeft>Исполнитель</BoldTextLeft>
                        {tasksList && tasksList.length > 0 && tasksList.map((executor: ITasksUser, i) => {
                            const executorName = usersList && usersList.filter((item: { _id: string, name: string; }) =>
                                item._id === executor.executorTaskId);
                            console.log(executorName)
                            return (
                                <MenuItemNew disableRipple key={i}>
                                    <Checkbox
                                        color="secondary"
                                        checked={checkedExecutorList && checkedExecutorList.filter((item: IChecked) =>
                                            item.id === executor._id).checked}
                                        onChange={e => handleChangeExecutorList(e)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        // name={executorName.name}
                                        id={executor._id}
                                    />
                                    {/* {executorName.name} */}
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
