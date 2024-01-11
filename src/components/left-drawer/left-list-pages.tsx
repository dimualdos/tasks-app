import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';

export const leftListPages = [
    { path: 'create-user/', text: 'Добавить сотрудника', icon: <PersonIcon />, icon1: <PersonIcon sx={{ color: '#0582a1' }} /> },
    { path: 'create-direction/', text: 'Создать направление', icon: <BadgeIcon />, icon1: < BadgeIcon sx={{ color: "#0582a1" }} /> },
    { path: 'users-list/', text: 'Посмотреть список сотрудников', icon: <GroupIcon />, icon1: <GroupIcon sx={{ color: "#0582a1" }} /> },
    { path: 'messenger/', text: 'Написать сообщение', icon: <MessageIcon />, icon1: <MessageIcon sx={{ color: "#0582a1" }} /> },

];
