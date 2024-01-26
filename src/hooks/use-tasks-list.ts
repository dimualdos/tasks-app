import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./hooks";
import { and, collection,  onSnapshot, orderBy, query,  where } from "firebase/firestore";
import { db } from "../utils/fire-base";
import { ITasksUser } from "../utils/types";


// логика: если задача добавлена при помомщи кнопки "+добавить задачу"
// но не завершена при помощи кнопки "создать задачу" 
// и если задача отменена при помощи кнопки "удалить задачу" 
// то обновляется номер задачи и привязвается ID пользователя создавшего её,
// также вводится время, задача улетает в базу со статусом statusEditDoc: false,
// если задача завершена при помощи кнопки "создать задачу",
// то обновляется время задачи в базе new Date().toUTCString()
// обновляются поля в базе executorTaskId, number,  nameTask: nameTasksUser,
//               taskStatus
//             taskDirection
//             taskDescription
//              taskLink
// поля в базе:    pendingConfirm - обновляется, когда исполнитель выполнил ее,
// confirmDoneManager - обновляется после принятия задачи создавшим ее менеджером


export const useTaskList = () => {
    const { userBaseData } = useAuth();
    const [tasksBoard, setTasksBoard] = useState<any>();
    const [tasksList, setTasksList] = useState<ITasksUser[]>()

    const numberTaskRef = collection(db, "tasksNumber");

    // получение списка задач конкретного пользователя, страница board-tasks,
    // нажатие кнопки "доска" в хедере
    // по UID пользователя 

    useEffect(() => {
        if (!userBaseData) { return };
        const q = query(numberTaskRef, and(
            where("executorTaskId", "==", userBaseData.uid)));
        const unsubscribeTaskStatus = onSnapshot(q, snapshot => {
            const dataTaskStatus = snapshot.docs.map(d => ({
                ...(d.data() as ITasksUser),
                _id: d.id,
            }));
            setTasksBoard(dataTaskStatus);
        })
        return () => unsubscribeTaskStatus();
    }, [userBaseData]);

    // получение всего списка созданных до конца задач 

    useEffect(() => {
        if (!userBaseData) { return };
        const q = query(numberTaskRef, where("statusEditDoc", "==", true));
        const unsubscribeTaskList = onSnapshot(q, snapshot => {
            const dataTaskList = snapshot.docs.map(d => ({
                ...(d.data() as ITasksUser),
                _id: d.id,
            }));
            setTasksList(dataTaskList);
        })
        return () => unsubscribeTaskList();
    }, [userBaseData]);



    const valueTaskList = useMemo(() => ({
        tasksBoard,
        tasksList
    }), [tasksBoard, tasksList]);


    return valueTaskList;
}

