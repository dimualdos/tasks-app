import Grid from '@mui/material/Unstable_Grid2';
import { H2Theme, ItemBackground, ItemGrid } from '../constants/constant-mui';
import { Avatar, Box } from '@mui/material';
import { useStatus, useTaskList, useUsersList } from '../hooks';
import { ITasksUser } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';



export const BoardTasks = () => {
    const { tasksBoard } = useTaskList();
    const { usersListFB } = useUsersList();
    const { statusListFB } = useStatus();
    const navigate = useNavigate();
    return (
        <Grid2 container xs={12} spacing={1} sx={{ justifyContent: 'center' }}>
            <Grid2 xs={12} sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}><H2Theme>Мои задачи</H2Theme></Grid2>
            {tasksBoard && tasksBoard!.map((item: ITasksUser) => {
                const statusName: any = statusListFB!.find((statusItem: any) => statusItem._id === item.taskStatus);
                const userTarget: any = usersListFB!.find((user: any) => user._id === item.whoAddedTheTaskUserId);
                return (
                    <Grid key={item._id} xl={3} md={3} xs={12} sm={6}>
                        <ItemBackground
                            onClick={() => navigate(`/number-task/${item.number}`)}
                            sx={{ cursor: 'pointer' }}>
                            <Box sx={{ textAlign: 'left' }}><h3>{statusName.name}</h3></Box>
                            <ItemGrid sx={{ gap: '10px' }}>
                                <Box sx={{ margin: '10px 0 0 10px' }}>{item.nameTask}</Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <Avatar src={userTarget.photoURL} sx={{ width: 24, height: 24, margin: '0 0 0 10px' }} />
                                    <p>{userTarget.displayName}</p>
                                </Box>
                            </ItemGrid>
                        </ItemBackground>
                    </Grid>
                )

            })}
        </Grid2>
    )
}
