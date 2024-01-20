import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./hooks";
import { addDoc, and, collection, doc, limit, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../utils/fire-base";
import { ITasksUser } from "../utils/types";
import { useProfile } from "./use-profile";

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


export const useTask = () => {
    const { userBaseData } = useAuth();
    const { profile } = useProfile();
    const [isLoadingTask, setIsLoadingTask] = useState(false);
    const [isSuccesAddTask, setIsSuccessAddTask] = useState(false);
    const [errorStateTask, setErrorStateTask] = useState<unknown | null>(null);
    const [numberTask, setNumberTask] = useState<ITasksUser>();
    const [queryEditDoc, setQueryEditDoc] = useState<any>();

    const numberTaskRef = collection(db, "tasksNumber");

    // получение последней задачи для обновления номера следующей задачи

    useEffect(() => {
        if (!userBaseData) { return };
        const q1 = query(numberTaskRef, orderBy("number", "desc"), limit(1));

        const unsubscribe = onSnapshot(q1, snapshot => {
            const dataNumber = snapshot.docs.map(d => ({
                ...(d.data() as ITasksUser),
                _id: d.id,
            }))[0];
            setNumberTask(dataNumber);
        });
        return () => unsubscribe();
    }, [userBaseData]);

    // получение задачи которую начал конкретный пользователь, которую начали ранее, но либо отменили либо вышли без сохранения

    useEffect(() => {
        if (!userBaseData) { return };
        const q = query(numberTaskRef, and(
            where("whoAddedTheTaskUserId", "==", userBaseData.uid),
            and(
                where("statusEditDoc", "==", false),
            )
        ), limit(1));
        const unsubscribeTaskStatus = onSnapshot(q, snapshot => {
            const dataTaskStatus = snapshot.docs.map(d => ({
                ...(d.data() as ITasksUser),
                _id: d.id,
            }));
            setQueryEditDoc(dataTaskStatus);
        })
        return () => unsubscribeTaskStatus();
    }, [userBaseData]);

    // проверка на то есть ли ранее созданная,
    // но не заплненная конкретным пользователем задача
    const chekedTasks = async () => {

        const docRef = collection(db, "tasksNumber");
        if (queryEditDoc && queryEditDoc.statusEditDoc === false) {
            return
        } else if (!queryEditDoc?.length) {
            setIsLoadingTask(true);
            try {
                await addDoc(docRef, {
                    nameTask: "",
                    whoAddedTheTaskUserId: profile._id,
                    number: numberTask!.number! + 1,
                    pendingConfirm: '',
                    statusEditDoc: false,
                    timeAdding: new Date().toUTCString(),
                });

                setIsSuccessAddTask(true);

                setTimeout(() => {
                    setIsLoadingTask(false);
                }, 3000);

            } catch (error) {
                setErrorStateTask(error);
                setIsLoadingTask(false);
                setIsSuccessAddTask(false);
            } finally {
                setTimeout(() => {
                    setIsLoadingTask(false);
                    setIsSuccessAddTask(false);
                }, 3000);

            }
        }
    };

    // добавление заполненной задачи в модальном окне по кнопке "создать задачу"
    const addNewTask = async (
        nameTasksUser: string,
        numberTasksUser: number,
        link: string,
        taskStatus: string,
        direction: string,
        currentUser: string,
        description: string
    ) => {
        setIsLoadingTask(true);

        const taskRef = doc(db, "tasksNumber", `${numberTask!._id!}`);

        try {
            await updateDoc(taskRef, {
                confirmDoneManager: '',
                executorTaskId: currentUser,
                number: numberTasksUser,
                pendingConfirm: '',
                statusEditDoc: true,

                nameTask: nameTasksUser,
                taskStatus: taskStatus,
                taskDirection: direction,
                taskDescription: description,
                taskLink: link,
                timeAdding: new Date().toUTCString(),

            });
            setIsSuccessAddTask(true);
            setTimeout(() => {
                setIsLoadingTask(false)
            }, 3000);

        } catch (error) {
            setErrorStateTask(error);
            setIsLoadingTask(false);
            setIsSuccessAddTask(false);
        } finally {
            setTimeout(() => {
                setIsLoadingTask(false);
                setIsSuccessAddTask(false);
            }, 3000);

        }
    };

    const valueTask = useMemo(() => ({
        queryEditDoc,
        numberTask,
        isLoadingTask,
        isSuccesAddTask,
        errorStateTask,
        addNewTask,
        chekedTasks,
    }), [queryEditDoc, numberTask, errorStateTask, isLoadingTask, isSuccesAddTask]);

    return valueTask;
}

