import { FunctionComponent } from "react";
import { Spinner } from "../components/spinner/spinner";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { ITasksItems } from "../utils/types";
import styles from "./css/new-tasks.module.css";
import { useGetAllListQuery } from "../servises/rtk-query/tasks-api";
import { NavLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { OverflowDiv } from "../constants/constant-mui";
import { useAppSelector } from "../hooks/hooks";
import { useDirections } from "../hooks/use-direction";
// import { fetchTasksServer, fetchTodos } from "../servises/slices/task-slice";

export const ItemMain = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.primary.main,
    ...theme.typography.body2,
    textAlign: "left",
    color: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.contrastText,
    display: "flex",
    flexDirection: "column",
    boxShadow: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
}));

const Item = styled(ItemMain)(({ theme }) => ({
    padding: theme.spacing(1),
    flexDirection: "row",
    alignItems: "center",
    boxShadow: "none",
    borderTop: theme.palette.mode === "dark" ? "1px solid #808080" : "1px solid #cecece",
    borderRadius: "0px",
}));
const ItemHeader = styled(ItemMain)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: "4px 4px 0px 0px",
    marginBottom: "5px",
}));
const ItemRight = styled("p")(({ theme }) => ({
    textAlign: "right",
    paddingRight: "1em",
}));

const LeftPaddingP = styled("p")(({ theme }) => ({
    paddingLeft: "15px",
    color: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.contrastText,
}));
const LeftPaddingPNumber = styled('p')(({ theme }) => ({
    paddingLeft: "15px",
    color: theme.palette.mode === "dark" ? theme.palette.text.secondary : theme.palette.primary.contrastText,
}));

export const HeaderList: FunctionComponent = () => {

    return (
        <Grid justifyContent="center" >
            <Grid xs={12} >
                <ItemHeader >
                    <Grid xs={1} sx={{ mr: 3 }}>
                        <LeftPaddingP>Статус</LeftPaddingP>
                    </Grid>
                    <Grid xs={5}>
                        <LeftPaddingP >Номер/ Название</LeftPaddingP>
                    </Grid>
                    <Grid xs={3}>
                        <p>Исполнитель</p>
                    </Grid>
                    <Grid xs={3} sx={{ mr: 2 }}>
                        <p>Направление</p>
                    </Grid>
                </ItemHeader>
            </Grid>
        </Grid>
    )
}

const DataItemsList = () => {
    const { directionsListFB } = useDirections();

    const { data = [], isFetching, isError, isLoading } = useGetAllListQuery("list");
    const { statusListData, directionsListData, executorsListData } = useAppSelector(state => state.filterData);


    // if (isError) return <div>An error has occurred!</div>;
    // if (isLoading) return <div>Loading</div>;
    // if (isFetching) return <div>Fetching</div>;



    const items = data && data.filter((item: ITasksItems) => {
        if (statusListData.length === 0 && directionsListFB.length === 0 && executorsListData.length === 0) {
            return item;
        } else if (statusListData.length > 0
            && item.taskStatus
            && item.taskStatus.name !== null
            && statusListData.findIndex((elem: string) => elem === item.taskStatus!.name!) > -1
            || executorsListData.length > 0
            && item.currentUser
            && item.currentUser !== null
            && executorsListData.findIndex((elem: string) => elem === item.currentUser!.name!) > -1
            || directionsListData.length > 0
            && item.currentUser
            && item.currentUser !== null
            && directionsListData.findIndex((elem: string) => elem === item.currentUser!.name!) > -1
        ) {
            return item;
        }
    }
    ).map((itemTasks: any) => {

        return (
            <Grid key={itemTasks.id} xs={12}>
                <Grid xs={12} >
                    <Item >
                        <Grid xs={1} sx={{ mr: 3 }}>
                            <LeftPaddingP>{itemTasks.taskStatus ? itemTasks.taskStatus.name : "Нет  статуса"}</LeftPaddingP>
                        </Grid>
                        <Grid xs={5}>
                            <NavLink
                                className={styles.textLinkTasks}
                                to={`/tasks-number/${itemTasks.number}`} >
                                <LeftPaddingPNumber className={styles.rowRadioSwitch}>
                                    <u >Задание №{itemTasks.number}</u>
                                </LeftPaddingPNumber>

                                <h4><LeftPaddingP>{itemTasks.name && itemTasks.name.length > 50 ? itemTasks.name.substring(0, 50) + "..." : itemTasks.name}</LeftPaddingP></h4>

                            </NavLink>
                        </Grid>
                        <Grid xs={3}>
                            <LeftPaddingP>{itemTasks.currentUser && itemTasks.currentUser.name ? itemTasks.currentUser.name : "Испонителя нет"}</LeftPaddingP>
                        </Grid>
                        <Grid xs={2}>
                            <p>{itemTasks.direction && itemTasks.direction.name ? itemTasks.direction.name : "направления нет"}</p>
                        </Grid>
                        <Grid xs={1}>
                            <ItemRight>{<MoreVertIcon />}</ItemRight>
                        </Grid>
                    </Item>
                </Grid>
            </Grid>
        )
    })

    return (
        <Grid container justifyContent="center"  >
            {items ? items : (<Spinner />)}
        </Grid>
    )
}

export const TasksList: FunctionComponent = () => {
    return (
        <Grid container justifyContent="center" xs={12} >
            <Grid xl={8} md={8} sm={12}>
                <ItemMain >
                    <HeaderList />
                    <OverflowDiv>
                        <DataItemsList />
                    </OverflowDiv>
                </ItemMain>
            </Grid>
        </Grid >
    )
}
