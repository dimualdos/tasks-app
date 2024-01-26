import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';


export const leftListPages = [
    { path: 'create-user/', text: 'Добавить сотрудника', icon: <PersonIcon />, icon1: <PersonIcon sx={{ color: '#0582a1' }} /> },
    { path: 'users-list/', text: 'Редактирование списка сотрудников', icon: <GroupIcon />, icon1: <GroupIcon sx={{ color: "#0582a1" }} /> },
    { path: 'job-title/', text: 'Добавить должность', icon: < SupervisedUserCircleIcon />, icon1: < SupervisedUserCircleIcon sx={{ color: "#0582a1" }} /> },
    { path: 'create-direction/', text: 'Редактирование направлений', icon: <BadgeIcon />, icon1: < BadgeIcon sx={{ color: "#0582a1" }} /> },
    { path: 'status-task/', text: 'Редактирование статусов задач', icon: <AssignmentIcon />, icon1: <AssignmentIcon sx={{ color: "#0582a1" }} /> },
    { path: 'messenger/', text: 'Переписка', icon: <MessageIcon />, icon1: <MessageIcon sx={{ color: "#0582a1" }} /> },
];
