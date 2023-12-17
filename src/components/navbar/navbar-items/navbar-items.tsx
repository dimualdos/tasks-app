
import AddTaskIcon from '@mui/icons-material/AddTask';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LowPriorityIcon from '@mui/icons-material/LowPriority';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <HomeIcon />,
        label: 'Главная',
        route: '/'
    },
    {
        id: 1,
        icon: <AddTaskIcon />,
        label: 'Добавленные задачи',
        route: 'new-tasks'
    },
    {
        id: 2,
        icon: <TaskIcon />,
        label: 'Выполненные задачи',
        route: 'completed-tasks'
    },
    {
        id: 3,
        icon: <AssignmentIcon />,
        label: 'Прочие задачи',
        route: 'other-tasks'
    },
    {
        id: 4,
        icon: <ListAltIcon />,
        label: 'Еще что то',
        route: 'something-else'
    },
    {
        id: 5,
        icon: <LowPriorityIcon />,
        label: 'Добавить задачу',
        route: 'add-task'
    }
]
