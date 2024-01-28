import { FC, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Avatar, Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableContainer, TablePagination, TableRow } from "@mui/material";
import { useUsersList } from "../../hooks/use-usersList"
import { HeaderButton, HeaderButtonActive, ItemGrid, TableCellTheme } from "../../constants/constant-mui";
import { IProfile } from "../../utils/types";
import { JobTitleModal } from "../../components/job-title-modal/job-title-modal";
import { useChangesUser } from "../../hooks/use-changes-user";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

// массив для таблицы пользователей. 
// разрешения для пользователей приложения всего 3 в данный момент
// "Измененеие данных" позволяет получить доступ к боковой панели в том числе к созданию пользователей 
// и к редактированию списка рользователей
// 'Постановка задач' даёт доступ ограниченно к боковой панели (редактирование направлений, должностей, статусов задач)
// 'Чтение' - это исполнитель задач

const columns: string[] = ['Аватар', 'Имя', 'Почта', 'Должность', 'Разрешения'];
const selectUsersChanges: { changesName: string, changes: boolean }[] = [
    {
        changesName: 'Изменение данных',
        changes: true
    },
    {
        changesName: 'Постановка задач',
        changes: true
    },
    {
        changesName: 'Чтение',
        changes: false
    }
]

export const UsersList: FC = () => {
    const { usersListFB } = useUsersList();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [changes, setChanges] = useState('');
    const [isOpenBox, setIsOpenBox] = useState(false);
    const [idUser, setIdUser] = useState('');
    const { errorState, isSuccesChanges, updateChangesUser, isChangesUserLoading } = useChangesUser();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEditChanges = (id: string) => {
        setIdUser(id);
        setIsOpenBox(!isOpenBox);
    };
    const handleChangeSelect = (event: SelectChangeEvent) => {
        setChanges(event.target.value as string);
    };

    const updateChanges = (event: any) => {
        event.preventDefault();
        const changesBoolean = selectUsersChanges.find(item => item.changesName === changes);
        updateChangesUser(changes, idUser, changesBoolean!.changes);
        setTimeout(() => {
            removeField();
            setIsOpenBox(false);
        }, 1500);
    };

    const removeField = () => {
        setChanges('');
        setTimeout(() => {
            setIsOpenBox(false);
        }, 1000);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>

            <ItemGrid xl={12} md={12} sm={12} xs={12} >
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <thead>
                            <TableRow>
                                {columns.map((column, i: number) => (
                                    <TableCellTheme
                                        key={i}
                                        align={'left'}
                                        style={{ minWidth: 170 }}
                                        sx={{ ":last-child": { display: 'flex', justifyContent: 'center' } }}
                                    >
                                        {column}
                                    </TableCellTheme>
                                ))}
                            </TableRow>
                        </thead>
                        {/* таблица со списком сотрудников */}
                        <TableBody>
                            {usersListFB &&
                                usersListFB.map((row: IProfile) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                            <TableCellTheme align={'left'}>
                                                {row.photoURL ? <Avatar alt="фото пользователя" src={row.photoURL} /> : null}
                                            </TableCellTheme>
                                            <TableCellTheme align={'left'} >
                                                {row.displayName ? row.displayName : null}
                                            </TableCellTheme>
                                            <TableCellTheme align={'left'}>
                                                {row.email ? row.email : null}
                                            </TableCellTheme>

                                            {/* // Модальное окно со списками активных должностей */}

                                            <TableCellTheme align={'left'}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    {row.jobTitle ? row.jobTitle : null}{<JobTitleModal idUser={row._id} />}
                                                </Box>
                                            </TableCellTheme>

                                            {/* установление разрешений пользователя */}
                                            <TableCellTheme align={'center'}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                    {row.changesName ? row.changesName : null}
                                                    <EditIcon sx={{ color: '#0582a1' }}
                                                        fontSize="small" onClick={() => handleEditChanges(row._id)} />
                                                </Box>
                                            </TableCellTheme>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={usersListFB ? usersListFB!.length - 1 : 1}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </ItemGrid>

            {/* модальное окно с разрешениями пользователя в системе */}

            {isOpenBox && <Grid2 xl={12} md={12} sm={12} xs={12} container sx={{
                display: 'flex',
                justifyContent: 'center', flexDirection: 'row',
                '& :first-of-type': { paddingTop: '5px' }
            }} >
                <ItemGrid xl={6} md={6} sm={6} xs={6} sx={{ padding: '20px 20px 0 20px' }}>
                    <form
                        onSubmit={updateChanges}
                        id={idUser} >

                        <FormControl fullWidth>
                            <InputLabel id={idUser}>Установить разрешение</InputLabel>
                            <Select
                                labelId={idUser}
                                id={idUser}
                                value={changes}
                                label="Установить разрешение"
                                onChange={handleChangeSelect}
                            >
                                {selectUsersChanges.map((item, i) => <MenuItem
                                    key={i} value={item.changesName}>{item.changesName}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <Box sx={{ mb: 1, mr: 1, display: 'flex', justifyContent: 'right', gap: '20px', marginTop: '1em' }}>
                            <HeaderButton
                                variant="contained"
                                size="small"
                                type="button"
                                id={idUser}
                                onClick={removeField}
                            >
                                Очистить поля
                            </HeaderButton>
                            <HeaderButtonActive
                                variant="contained"
                                size="small"
                                type={'submit'}
                                id={idUser}
                                disabled={isChangesUserLoading}
                            >
                                {'Обновить'}
                            </HeaderButtonActive>
                        </Box>
                    </form>
                    {errorState ? <Alert severity="error">{`${errorState}`}</Alert> : null}
                    {isSuccesChanges ? <Alert severity="success">Изменения сохранены!</Alert> : null}
                </ItemGrid>
            </Grid2>

            }
        </Box>
    )
}

