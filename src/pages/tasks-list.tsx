import { FunctionComponent, useMemo } from "react";
import { Spinner } from "../components/spinner/spinner";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { ITasksUser } from "../utils/types";
import styles from "./css/new-tasks.module.css";
import { NavLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { OverflowDiv } from "../constants/constant-mui";
import { useAppSelector } from "../hooks/hooks";
import { useDirections, useTaskList, useUsersList, useStatus } from "../hooks";


export const ItemMain = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.primary.main,
    ...theme.typography.body2,
    textAlign: "left",
    color: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.text.primary,
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
}));
const LeftPaddingPNumber = styled('p')(({ theme }) => ({
    paddingLeft: "15px",
    color: theme.palette.mode === "dark" ? theme.palette.text.secondary : theme.palette.primary.contrastText,
}));

//логика компонента TasksList: получаем tasksList, usersListFB, statusListFB, 
// и отображаем данные на странице из usersListFB
// направление, статус задачи, и исполнитель в массиве данных лежат в виде _id (который формируется динамически);
//в базе данных к напрвалению, статусу, создателю задачи и исполнителю прикрепляются уникальные ID
// если напрваление или статус или исполнитель удалены,
// то в соотвествующих полях будет стоять запись "статуса нет" "направления нет" "исполнителя нет"


export const HeaderList: FunctionComponent = () => {
    // формируем хедер списка
    return (
        <Grid justifyContent="center" >
            <Grid xs={12} >
                <ItemHeader  >
                    <Grid xs={3} sx={{ mr: 3 }}>
                        <LeftPaddingP>Статус</LeftPaddingP>
                    </Grid>
                    <Grid xs={3}>
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
    const { tasksList } = useTaskList();
    const { usersListFB } = useUsersList();
    const { statusListFB } = useStatus();
    const { statusListData, directionsListData, executorsListData, creatorsListData } = useAppSelector(state => state.filterData);

    if (statusListData.length > 0) console.log(statusListData);
    if (directionsListData.length > 0) console.log(directionsListData);
    if (executorsListData.length > 0) console.log(executorsListData)


    const items = useMemo(() => tasksList && tasksList.sort((a, b) => b.number - a.number).filter((item: ITasksUser) => {
        // если нет листа задач, статусов, направлений исполнителе, создателей
        if (statusListData.length === 0 && directionsListData.length === 0 && executorsListData.length === 0 && creatorsListData.length === 0) {
            return item;
        }
        else if ((item.taskStatus !== null || item.taskDirection !== null || item.executorTaskId !== null || item.whoAddedTheTaskUserId !== null) && (
            // поиск листа статусов, направлений исполнителе, создателей и сравниваем его id с id задачи, направления, исполнителя, создателя
            statusListData.find((elem: { id: string }) => elem.id === item.taskStatus) ||
            directionsListData.find((elem: { id: string }) => elem.id === item.taskDirection) ||
            executorsListData.find((elem: { id: string }) => elem.id === item.executorTaskId) ||
            creatorsListData.find((elem: { id: string }) => elem.id === item.whoAddedTheTaskUserId)
        )) {
            return item;
        }
    }).map((itemTasks) => {
        // создание листа задач
        const statusName: { name: string, _id: string } = statusListFB!.find((item: any) => item._id === itemTasks.taskStatus);
        const directionName: { name: string, _id: string } = directionsListFB!.find((item: any) => item._id === itemTasks.taskDirection);
        const executorName: any = usersListFB!.find((item: any) => item._id === itemTasks.executorTaskId);
        return (
            <Grid key={itemTasks._id} xs={12}>
                <Grid xs={12} >
                    <Item >
                        <Grid xs={3} sx={{ mr: 3 }}>
                            <LeftPaddingP>{statusName ? statusName.name : "Нет  статуса"}</LeftPaddingP>
                        </Grid>
                        <Grid xs={3} sx={{ cursor: 'pointer' }}>
                            {/* при нажатии на ссылку активируется компонент TaskDetail  с номером задачи*/}
                            <NavLink
                                className={styles.textLinkTasks}
                                to={`/number-task/${itemTasks.number}`}

                            >
                                <LeftPaddingPNumber className={styles.rowRadioSwitch}>
                                    <u >Задание №{itemTasks.number}</u>
                                </LeftPaddingPNumber>

                                {/* <h4><LeftPaddingP>{itemTasks.name && itemTasks.name.length > 50 ? itemTasks.name.substring(0, 50) + "..." : itemTasks.name}</LeftPaddingP></h4> */}

                            </NavLink>
                        </Grid>
                        <Grid xs={3}>
                            <LeftPaddingP>{executorName ? executorName.displayName : "Испонителя нет"}</LeftPaddingP>
                        </Grid>
                        <Grid xs={2} >
                            <p>{directionName ? directionName.name : "направления нет"}</p>
                        </Grid>
                        <Grid xs={1}>
                            <ItemRight>{<MoreVertIcon />}</ItemRight>
                        </Grid>
                    </Item>
                </Grid>
            </Grid>
        )
    }), [tasksList, statusListData, directionsListData, executorsListData, statusListFB, directionsListFB, usersListFB]);

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
