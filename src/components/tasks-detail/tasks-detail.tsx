import { FunctionComponent, useMemo } from "react";
import { Spinner } from "../spinner/spinner";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Chat from "../chat/chat";
import { useParams } from "react-router-dom";
import styles from "./tasks-detail.module.css";
import { useGetTasksIdQuery } from "../../servises/rtk-query/tasks-api";
import Box from "@mui/material/Box";
import { BoxAvatar } from "../../pages/add-task";
import { BadgeAvatars } from "../avatar/avatar";
import { useTaskList } from "../../hooks/use-tasks-list";
import { useUsersList } from "../../hooks/use-usersList";
import { useStatus } from "../../hooks/use-status";
import { useDirections } from "../../hooks/use-direction";
import Avatar from "@mui/material/Avatar";



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
    const { tasksList } = useTaskList();
    const { usersListFB } = useUsersList();
    const { statusListFB } = useStatus();
    const { directionsListFB } = useDirections();

    const taskItem = useMemo(() => {
        const taskID: any = tasksList && tasksList!.find((item: any) => item.number === +`${id}`);
        if (!taskID) return <div>Loading</div>
        const customer = usersListFB && usersListFB!.find((item: any) => item._id === taskID.whoAddedTheTaskUserId);
        const currentUser = usersListFB && usersListFB!.find((item: any) => item._id === taskID.executorTaskId);
        const taskStatus = statusListFB && statusListFB!.find((item: any) => item._id === taskID.taskStatus);
        const direction = directionsListFB && directionsListFB!.find((item: any) => item._id === taskID.taskDirection);
        console.log(currentUser)
        return (
            <Grid xs={8} >
                <ItemTask >
                    <ItemTask2>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Grid display={"flex"} alignItems={"center"} xs={3}><div>Задание № {taskID ? `${taskID.number}` : null}</div></Grid>
                            <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }} >
                                <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap' }}>
                                    <BoxAvatar>Автор <Avatar alt="name" src={customer ? customer.photoURL : "Автора нет"} /></BoxAvatar>
                                    {customer ? customer.displayName : null},
                                </Grid>
                                <Box>почта: {customer ? customer.email : null}</Box>
                            </Grid>
                        </Box >

                        <h1>{taskID ? taskID.nameTask : null}</h1>

                        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                            <Grid xs={6}><BoxAvatarLeft><Avatar alt="name" src={currentUser ? currentUser.photoURL : "Исполнителя нет"} /><>{currentUser ? currentUser.displayName : "Исполнителя нет"}</></BoxAvatarLeft></Grid>
                            <Grid xs={3} display={"flex"} alignItems={"center"}><BoxSelect>{taskStatus ? taskStatus.name : "статуса нет"}</BoxSelect></Grid>
                            <Grid xs={3} display={"flex"} alignItems={"center"}><BoxSelect>{direction ? direction.name : "направления нет"}</BoxSelect></Grid>
                        </Box>

                        <hr />
                        {/* описание задачи при помощи dangerouslySetInnerHTML */}
                        <div>{taskID ? <Box sx={{ textAlign: "left" }} pl={2} dangerouslySetInnerHTML={{ __html: taskID.taskDescription }}></Box> : null}</div>

                    </ItemTask2>

                </ItemTask>
            </Grid>
        )
    }, [directionsListFB, id, statusListFB, tasksList, usersListFB])

    return (
        <Grid container xs={12} spacing={2} justifyContent={"center"}>
            <Grid xs={10} container justifyContent={"center"}>
                {taskItem ? taskItem : (<Spinner />)}
                <Grid xs={4} >
                    <ItemTask> <Chat /></ItemTask>
                </Grid>
            </Grid>
        </Grid>
    )
}

