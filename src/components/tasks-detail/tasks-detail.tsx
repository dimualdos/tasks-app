import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Spinner } from "../spinner/spinner";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { BoxAvatar } from "../../pages/add-task";
import Avatar from "@mui/material/Avatar";
import { SelectRow } from "../select-task/select-row";
import Grid2 from "@mui/material/Unstable_Grid2";
import { HeaderButtonActive } from "../../constants/constant-mui";
import { useTask, useTaskList, useUsersList, useStatus, useDirections } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Alert } from "@mui/material";
import { AppDispatch } from "../../servises/store";
import { createIDTask } from '../../servises/redusers/id-task-user-board-reducer';




export const BoxAvatarLeft = styled(BoxAvatar)(({ theme }) => ({
    justifyContent: "left",
}));
const ItemTask = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.primary.main,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.mode === "dark" ? theme.palette.text.primary : theme.palette.text.primary,
}));

const ItemTask2 = styled("div")(({ theme }) => ({
    maxHeight: "80vh",
    overflowY: "auto",
    overflowX: "hidden",
}))

const BoxSelect = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.main : "#C2DAE1",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: "5px",
}))

export const TasksDetail: FunctionComponent = () => {
    let { id } = useParams();
    const { idTaskBoard } = useAppSelector(state => state.idTaskTarget);
    const dispatch: AppDispatch = useAppDispatch();

    const { tasksList } = useTaskList();
    const { usersListFB } = useUsersList();
    const { statusListFB, statusActive } = useStatus();
    const { directionsListFB } = useDirections();
    const { updateTargetTask, isSuccesUpdateTasks, isLoadingUpdateTask, errorStateTask } = useTask();
    const [statusTaskUser, setStatusTaskUser] = useState({ value: '', style: false });

    useEffect(() => {
        const taskID: any = tasksList && tasksList!.find((item: any) => item.number === +`${id}`);
        if (taskID) dispatch(createIDTask(taskID._id));

    }, [id, tasksList]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // валидация обязательных полей
        if (!statusTaskUser.value.trim().length) {
            statusTaskUser.value.trim().length === 0 ? setStatusTaskUser({ value: statusTaskUser.value.trim(), style: true }) : setStatusTaskUser({ value: statusTaskUser.value.trim(), style: false });
            alert('Заполните все поля');
            return
        };
        updateTargetTask(
            statusTaskUser.value,
            idTaskBoard,
        );
    };


    const taskItem = useMemo(() => {
        const taskID: any = tasksList && tasksList!.find((item: any) => item.number === +`${id}`);
        if (!taskID) return <div>Loading</div>
        const customer = usersListFB && usersListFB!.find((item: any) => item._id === taskID.whoAddedTheTaskUserId);
        const currentUser = usersListFB && usersListFB!.find((item: any) => item._id === taskID.executorTaskId);
        const taskStatus = statusListFB && statusListFB!.find((item: any) => item._id === taskID.taskStatus);
        const direction = directionsListFB && directionsListFB!.find((item: any) => item._id === taskID.taskDirection);

        return (
            <Grid xs={12} >
                <ItemTask >
                    {errorStateTask ? <Alert severity="error">{`${errorStateTask}`}</Alert> : null}
                    <ItemTask2>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Grid2 display={"flex"} alignItems={"center"} xs={3}><div>Задание № {taskID ? `${taskID.number}` : null}</div></Grid2>
                            <Grid2 sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }} >
                                <Grid2 sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap' }}>
                                    <BoxAvatar>Автор <Avatar alt="name" src={customer ? customer.photoURL : "Автора нет"} /></BoxAvatar>
                                    {customer ? customer.displayName : null},
                                </Grid2>
                                <Box>почта: {customer ? customer.email : null}</Box>
                            </Grid2>
                        </Box >

                        <h1>{taskID ? taskID.nameTask : null}</h1>

                        <Grid2 sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Grid2 xs={6}>
                                <BoxAvatarLeft>
                                    <Avatar alt="name" src={currentUser ? currentUser.photoURL : "Исполнителя нет"} />
                                    {currentUser ? currentUser.displayName : "Исполнителя нет"}
                                </BoxAvatarLeft>
                            </Grid2>
                            <Grid2 xs={3} sx={{ flexDirection: 'column', alignItems: 'center', padding: '0' }}>
                                <form
                                    onSubmit={handleSubmit}
                                    id={'edit-tasks'}>

                                    <SelectRow
                                        //data={} -- передается пропсом данные компоненту
                                        // value={currentUserData.value}
                                        data={statusActive}
                                        nameOption={taskStatus ? taskStatus!.name : "статуса нет"}
                                        valueState={statusTaskUser.value}
                                        ariaLabel={"Статус работ"}
                                        name="statusUser" id="status-id"
                                        onChange={(event: { target: { value: string; }; }) =>
                                            setStatusTaskUser({ value: event.target.value, style: false })}
                                        stateStyleBolean={statusTaskUser.style}
                                    />
                                    <HeaderButtonActive
                                        variant="contained"
                                        size="small"
                                        type="submit"
                                        disabled={isLoadingUpdateTask}
                                    >
                                        {isSuccesUpdateTasks ? 'Изменения сохранены!' : 'Изменить статус'}
                                    </HeaderButtonActive>

                                </form>

                            </Grid2>
                            <Grid2 xs={3} >

                                <BoxSelect sx={{ height: '35px', }}>
                                    {direction ? <Box sx={{ paddingTop: '8px' }}>{direction.name}</Box> : <Box sx={{ paddingTop: '8px' }}>направления нет</Box>}
                                </BoxSelect>
                            </Grid2>
                        </Grid2>

                        <hr />
                        {/* описание задачи при помощи dangerouslySetInnerHTML */}
                        <div>{taskID ? <Box sx={{ textAlign: "left" }} pl={2} dangerouslySetInnerHTML={{ __html: taskID.taskDescription }}></Box> : null}</div>

                    </ItemTask2>

                </ItemTask >
            </Grid >
        )
    }, [tasksList, usersListFB, statusListFB, directionsListFB, errorStateTask, isSuccesUpdateTasks, statusActive, statusTaskUser.value, statusTaskUser.style, isLoadingUpdateTask, id])

    return (
        <Grid container xs={12} spacing={2} justifyContent={"center"}>
            <Grid xs={10} container justifyContent={"center"}>
                {taskItem ? taskItem : (<Spinner />)}
                {/* <Grid xs={4} >
                    <ItemTask> <Chat /></ItemTask>
                </Grid> */}
            </Grid>
        </Grid>
    )
}

