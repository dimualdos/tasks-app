import { FunctionComponent, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material";
import Grid from '@mui/system/Unstable_Grid';
import { BadgeAvatars } from "../components/avatar/avatar";
import { SelectRow } from "../components/select-task/select-row";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { HeaderButton, HeaderButtonActive } from "../constants/constant-mui";
import { useTask } from "../hooks/useAddTask";
import { useProfile } from "../hooks/use-profile";
import { useUsersList } from "../hooks/use-usersList";
import { useDirections } from "../hooks/use-direction";
import styles from './css/add-tasks.module.css';
import Modal from "../components/modal/modal";
import { useStatus } from "../hooks/use-statuse";


export const BoxAvatar = styled(Box)(({ theme }) => ({
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
    alignItems: 'center',
    gap: '10px',
    marginRight: '10px',
}));

const BoxNumberTasks = styled(BoxAvatar)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.text.secondary : theme.palette.text.primary,
    backgroundColor: '#F2F2F2',
    margin: '10px',
    borderRadius: '5px',
    alignItems: 'center',
    justifyContent: 'center',
}));
const ItemTask2 = styled('div')(({ theme }) => ({
    maxHeight: `70vh`,
    overflowY: 'auto',
    overflowX: 'hidden',
}))

const modulesRedactor = {
    toolbar: [
        // [{ header: [1, 2, 3, 4, 5, 6, false] }],
        // [{ font: [] }],
        [{ align: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link']
    ],

}

export const AddTaskApp: FunctionComponent = () => {
    const { profile } = useProfile();
    const { usersListFB } = useUsersList();
    const { directionsListFB } = useDirections();
    const { statusListFB } = useStatus();
    const { numberTask, addNewTask, chekedTasks } = useTask();
    const [isOpen, setIsOpen] = useState(false);

    const handleClickButton = () => {
        setIsOpen(!isOpen);
        chekedTasks();
    }
    const handleClose = () => {
        setIsOpen(!isOpen);
    };

    const [nameTask, setNameTask] = useState({ value: '', style: false });
    const [linkTask, setLinkTask] = useState({ value: '', style: false });
    const [textDescription, setTextDescription] = useState('');
    const [descriptionStatus, setDescriptonStatus] = useState(false)
    const [direction, setDirection] = useState({ value: '', style: false });
    const [status, setStatus] = useState({ value: '', style: false });
    const [currentUserData, setCurrentUserData] = useState({ value: '', style: false });


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // валидация обязательных полей
        if (!nameTask.value.trim().length
            || !textDescription.trim().length
            || !status.value.trim().length
            || !direction.value.trim().length
            || !currentUserData.value.trim().length) {
            // linkTask.value.trim().length === 0 ? setLinkTask({ value: linkTask.value, style: true }) : setLinkTask({ value: linkTask.value, style: false });
            nameTask.value.trim().length === 0 ? setNameTask({ value: nameTask.value, style: true }) : setNameTask({ value: nameTask.value, style: false });
            status.value.trim().length === 0 ? setStatus({ value: status.value.trim(), style: true }) : setStatus({ value: status.value.trim(), style: false });
            direction.value.trim().length === 0 ? setDirection({ value: direction.value.trim(), style: true }) : setDirection({ value: direction.value.trim(), style: false });
            currentUserData.value.trim().length === 0 ? setCurrentUserData({ value: currentUserData.value, style: true }) : setCurrentUserData({ value: currentUserData.value, style: false });
            !textDescription.trim().length ? setDescriptonStatus(true) : setDescriptonStatus(false);
            alert('Заполните все поля')
            return
        };
        // добавление задачи - в ней передаю id исполнителя,
        addNewTask(nameTask.value,
            numberTask!.number!,
            linkTask.value,
            status.value,
            direction.value,
            currentUserData.value,
            textDescription,
        );

        setTimeout(() => {
            removeFieldWrapper();


        }, 2000)
    }

    const removeFieldWrapper = () => {
        setTextDescription('');
        setNameTask({ value: '', style: false });
        setLinkTask({ value: '', style: false });
        setDirection({ value: '', style: false });
        setCurrentUserData({ value: '', style: false });
        setStatus({ value: '', style: false });
        setDescriptonStatus(false);
        setTimeout(() => {
            setIsOpen(false)
        }, 500)
    }


    return (
        <Box>
            <HeaderButtonActive size="small" variant="contained" onClick={handleClickButton}>+ Добавить задачу</HeaderButtonActive>
            {isOpen && <Modal tasksOverlay={true} onClose={handleClose} overlay={true}>
                <Grid sx={{
                    padding: '20px',
                }} >

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Grid xs={2} sx={{ minWidth: '20%' }}><BoxNumberTasks>{numberTask?.number} </BoxNumberTasks></Grid>
                        <Grid xs={8}>{profile.photoURL ? <BoxAvatar >Автор <BadgeAvatars imageSrc={profile.photoURL}
                            data={profile.displayName} /></BoxAvatar> : null}
                        </Grid>
                    </Box >
                    <ItemTask2>
                        <form
                            onSubmit={handleSubmit}
                            method="post" id="outlined-controlled-form">
                            <Box
                                sx={{
                                    '& > :not(style)': { m: 1, width: '100%' },
                                }}
                            >
                                {/* имя задачи */}
                                <TextField
                                    id="outlined-controlled"
                                    label="Название задачи"
                                    variant="filled"
                                    multiline
                                    value={nameTask.value}
                                    onChange={(event) => {
                                        setNameTask({ value: event.target.value, style: false });
                                    }}
                                    sx={nameTask.style === true ? { border: "2px dashed red", borderRadius: "7px" } : null}
                                />
                                <Box sx={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    justifyContent: 'left',
                                    gap: '10px',
                                    margin: '0 10px 0 10px',
                                }}>
                                    {/* выбор исполнителя задачи */}
                                    <SelectRow
                                        //data={} -- передается пропсом данные компоненту
                                        // value={currentUserData.value}
                                        data={usersListFB}
                                        nameOption="Исполнитель "
                                        directionState={currentUserData.value}
                                        ariaLabel={"Выпадающий список исполнителей работ"}
                                        name="perfomer" id="perfomer"
                                        onChange={(event: { target: { value: string; }; }) => setCurrentUserData({ value: event.target.value, style: false })}
                                        stateStyleBolean={currentUserData.style}

                                    />
                                    <SelectRow
                                        data={statusListFB}
                                        nameOption="Статус"
                                        directionState={status.value}
                                        ariaLabel={"Выпадающий список выбора статуса задачи"}
                                        name="status" id="satus"
                                        onChange={(event: { target: { value: string; }; }) => setStatus({ value: event.target.value, style: false })}
                                        stateStyleBolean={status.style}
                                    />
                                    <SelectRow
                                        data={directionsListFB}
                                        nameOption="Направление"
                                        directionState={direction.value}
                                        ariaLabel={"Выпадающий список выбора направлений"}
                                        name="direction" id="direction"
                                        onChange={(event: { target: { value: string; }; }) => setDirection({ value: event.target.value, style: false })}
                                        stateStyleBolean={direction.style}
                                    />
                                </Box>

                                <Box sx={{ mt: 2 }}>
                                    <ReactQuill
                                        theme="snow"
                                        value={textDescription}
                                        onChange={setTextDescription}
                                        className={styles.reactQuillStyle}
                                        modules={modulesRedactor}
                                        placeholder="Описание задачи"
                                        style={descriptionStatus === true && textDescription.trim().length === 0 ? { border: "2px dashed red", borderRadius: '7px' } : undefined}
                                    />

                                </Box>

                                <TextField
                                    id="outlined-controlled2"
                                    label="Ссылка на задачу"
                                    multiline
                                    variant="filled"
                                    value={linkTask.value}
                                    onChange={(event) => {
                                        setLinkTask({ value: event.target.value, style: false });
                                    }}
                                    sx={linkTask.style === true ? { border: "2px dashed red", borderRadius: "7px" } : null}
                                />
                            </Box>
                            <Box sx={{ mb: 1, mr: 1, display: "flex", justifyContent: "right", gap: "20px", marginTop: "1em" }}>
                                <HeaderButton
                                    variant="contained"
                                    size="small"
                                    type="button"
                                    onClick={removeFieldWrapper}
                                // endIcon={<SendIcon />}
                                >
                                    Удалить задачу
                                </HeaderButton>
                                <HeaderButtonActive
                                    variant="contained"
                                    size="small"
                                    type="submit"
                                // endIcon={<SendIcon />}
                                >
                                    Создать задачу
                                </HeaderButtonActive>
                            </Box>
                        </form>
                    </ItemTask2>
                </Grid >
            </Modal>
            }

        </Box>

    )
}

