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
    // if (id) console.log(id)
    //const { todos } = useAppSelector((store) => store.tasksArray);
    const { data = [], isFetching, isError, isLoading } = useGetTasksIdQuery(`${id}`);

    const taskItem = useMemo(() => {
        if (isError) return <div>An error has occurred!</div>
        if (isLoading) return <div>Loading</div>
        return (
            <Grid xs={8} >
                <ItemTask >
                    <ItemTask2>
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                            <Grid display={"flex"} alignItems={"center"} xs={3}><>Задание №{data ? data.fullNumber : null}</></Grid>
                            <Grid xs={8}><BoxAvatar>Автор <BadgeAvatars data={data ? data.customer.name : "Автора нет"} /></BoxAvatar></Grid>
                            {/* <h4>Заказчик {data ? data.customer.name : null}, почта: {data ? data.customer.email : null}</h4> */}
                        </Box >

                        <h1>{data ? data.name : null}</h1>

                        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                            <Grid xs={6}><BoxAvatarLeft><BadgeAvatars data={data.currentUser && data.currentUser.name ? data.currentUser.name : "Исполнителя нет"} /></BoxAvatarLeft></Grid>
                            <Grid xs={3} display={"flex"} alignItems={"center"}><BoxSelect>{data.taskStatus && data.taskStatus.name ? data.taskStatus.name : "статуса нет"}</BoxSelect></Grid>
                            <Grid xs={3} display={"flex"} alignItems={"center"}><BoxSelect>{data ? data.direction.name : "направления нет"}</BoxSelect></Grid>
                        </Box>

                        <hr />
                        {/* описание задачи при помощи dangerouslySetInnerHTML */}
                        <div>{data ? <Box sx={{ textAlign: "left" }} pl={2} dangerouslySetInnerHTML={{ __html: data.description }}></Box> : null}</div>

                    </ItemTask2>

                </ItemTask>
            </Grid>
        )
    }, [data, isError, isLoading])

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

