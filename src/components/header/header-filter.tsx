import * as React from 'react';
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import { BoldTextLeft, HeaderButtonFilters, OverflowFilter } from '../../constants/constant-mui';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { IChecked, ITasksUser } from '../../utils/types';
import { setFilterCreator, setFilterDirection, setFilterExecutor, setFilterStatus } from '../../servises/actions/filter-data-actions';
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
    // const statuseList = useAppSelector(state => state.dataLists.statuseList);
    // const directionsList = useAppSelector(state => state.dataLists.directionsList);
    // const usersList = useAppSelector(state => state.dataLists.usersList);
    const [checkedStatuseList, setCheckedStatuseList] = useState<any>([{}]);
    const [checkedDirectionsList, setCheckedDirectionsList] = useState<any>([{}]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [executorsDataList, setExecutorsDataList] = useState<any>([]);
    const [creatorTaskList, setCreatorTaskList] = useState<any>();
    const [isOpen, setIsOpen] = React.useState(false);



    const setFunction = React.useCallback(() => {
        let statuseData: React.SetStateAction<any> = [];
        let directionsData: React.SetStateAction<any> = [];

        if ((tasksList && statusActive && directionsActive) &&
            (statusActive.length > 0 || directionsActive.length > 0 || tasksList.length > 0)) {
            statuseData = statusActive && statusActive.map((statuse: any) => (statuse = { name: statuse.name, id: statuse._id, checked: false }));
            directionsData = directionsActive.map((directions: any) => (directions = { name: directions.name, id: directions._id, checked: false }));
            setCheckedStatuseList(statuseData);
            setCheckedDirectionsList(directionsData);
        }
    }, [directionsActive, statusActive, tasksList]);

    const open = Boolean(anchorEl);
    const handleClickButton = () => {
        setIsOpen(!isOpen);
        setFunction();
    };

    const handleClose = () => {
        setIsOpen(!isOpen);
        setAnchorEl(null);
    };
    const universalCheckedFunction = useMemo(() => (universalSetCheckedList: any, dataCheked: any[], event: React.ChangeEvent<HTMLInputElement>) => {
        universalSetCheckedList([...dataCheked.map((item: IChecked) => {

            if (item.name === event.target.name && item.id === event.target.id) {
                return { name: item.name, id: item.id, checked: !item.checked }
            }
            return item;
        }
        )]);
    }, []);

    const handleChangeStatuseList = (event: React.ChangeEvent<HTMLInputElement>) => {
        universalCheckedFunction(setCheckedStatuseList, checkedStatuseList, event);

    };
    const handleChangeDirectionsList = (event: React.ChangeEvent<HTMLInputElement>) => {
        universalCheckedFunction(setCheckedDirectionsList, checkedDirectionsList, event);
    };
    const handleChangeExecutorList = (event: React.ChangeEvent<HTMLInputElement>) => {
        universalCheckedFunction(setExecutorsDataList, executorsDataList, event);

        // setCheckedExecutorList([...checkedExecutorList.map((item: IChecked) => {
        //     if (item.name === event.target.name && item.id === event.target.id) {
        //         return { name: item.name, id: item.id, checked: !item.checked }
        //     }
        //     return item;
        // }
        // )]);
    };

    const handleChangeCreateTaskUserList = (event: React.ChangeEvent<HTMLInputElement>) => {
        universalCheckedFunction(setCreatorTaskList, creatorTaskList, event);
    };

    // Логика получения исполнителей из списка задач,
    useEffect(() => {

        let arrExecutors: any = [];
        let setUsersExecutor: any = new Set();

        const usersExecutor = tasksList && tasksList!.map((executor: any) => {
            const executorName1 = usersListFB && usersListFB.find((item: any) => item!._id === executor.executorTaskId);
            return executorName1
        });

        if (!usersExecutor) return;
        for (let i = 0; i < usersExecutor!.length; i++) {
            if (usersExecutor[i]) {
                setUsersExecutor.add(usersExecutor[i]);
            }
        };
        for (let item of setUsersExecutor) {
            arrExecutors.push({ name: item.displayName, id: item._id, checked: false });
        }
        if (arrExecutors.length === 0 || arrExecutors === undefined) return;
        setExecutorsDataList(
            [...arrExecutors]
        );

    }, [tasksList, usersListFB]);
    // логика получения списка пользователей (из спика задач), создавших задачи 
    useEffect(() => {
        let arrCreators: any = [];
        let setUsersCreator: any = new Set();

        const usersCreators = tasksList && tasksList!.map((creator: any) => {
            const creatorName = usersListFB && usersListFB.find((item: any) => item!._id === creator.whoAddedTheTaskUserId);
            return creatorName
        });

        if (!usersCreators) return;
        for (let i = 0; i < usersCreators!.length; i++) {

            if (usersCreators[i]) {
                setUsersCreator.add(usersCreators[i]);
            }
        };
        for (let item of setUsersCreator) {
            arrCreators.push({ name: item.displayName, id: item._id, checked: false });
        }

        if (arrCreators.length === 0 || arrCreators === undefined) return;
        setCreatorTaskList(
            [...arrCreators]
        );

    }, [tasksList, usersListFB])

    useEffect(() => {
        // отправление отфильтрованных статусов, исполнителей, направлений, создателей в stor
        let status: any = [];
        let direction: any = [];
        let executor: any = [];
        let creator: any = [];
        if (checkedStatuseList.length > 0) {
            status = checkedStatuseList.filter((item: IChecked) => item.checked === true);
            dispatch(setFilterStatus(status));
        };

        if (checkedDirectionsList.length > 0) {
            direction = checkedDirectionsList.filter((item: IChecked) => item.checked === true)
            dispatch(setFilterDirection(direction));
        };
        if (executorsDataList && executorsDataList.length > 0) {
            executor = executorsDataList.filter((item: IChecked) => item.checked === true);
            dispatch(setFilterExecutor(executor));
        };
        if (creatorTaskList && creatorTaskList.length > 0) {
            creator = creatorTaskList.filter((item: IChecked) => item.checked === true);
            dispatch(setFilterCreator(creator));
        }

    }, [checkedDirectionsList, checkedStatuseList, creatorTaskList, dispatch, executorsDataList]);


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
                                        checked={checkedDirectionsList.checked}
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
                        {executorsDataList && executorsDataList!.map((executor: any) => {
                            return (
                                <MenuItemNew disableRipple key={executor.id}>
                                    <Checkbox
                                        color="secondary"
                                        checked={executorsDataList.checked}
                                        onChange={e => handleChangeExecutorList(e)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name={executor.name}
                                        id={executor.id}
                                    />
                                    {executor.name}
                                </MenuItemNew>
                            )
                        })}

                        <BoldTextLeft>Создатель</BoldTextLeft>
                        {creatorTaskList && creatorTaskList.map((creator: any) => {
                            return (
                                <MenuItemNew disableRipple key={creator.id}>
                                    <Checkbox
                                        color="secondary"
                                        checked={creatorTaskList.checked}
                                        onChange={e => handleChangeCreateTaskUserList(e)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name={creator.name}
                                        id={creator.id}
                                    />
                                    {creator.name}
                                </MenuItemNew>
                            )
                        })}

                    </Box>
                </OverflowFilter>
            </Modal>)}
        </Box>
    );
};

export default HeaderFilter;
