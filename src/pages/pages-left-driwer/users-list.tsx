import { FC, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableContainer, TablePagination, TableRow } from "@mui/material";
import { useUsersList } from "../../hooks/use-usersList"
import { HeaderButton, HeaderButtonActive, ItemGrid, TableCellTheme } from "../../constants/constant-mui";
import { IProfile } from "../../utils/types";
import { JobTitleModal } from "../../components/job-title-modal/job-title-modal";
import { useChangesUser } from "../../hooks/use-changes-user";

const columns: string[] = ['Аватар', 'Имя', 'Почта', 'Должность', 'Разрешения'];
const selectUsersChanges: string[] = ['Изменение данных', 'Постановка задач', 'Чтение']

export const UsersList: FC = () => {

    const { usersListFB } = useUsersList();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [changes, setChanges] = useState('');
    const [isOpenBox, setIsOpenBox] = useState(false);
    const [idUser, setIdUser] = useState('');
    const { errorState, isSuccesChanges, updateChangesUser, isChangesUserLoading } = useChangesUser(idUser as string);

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

    const removeField = () => {
        setChanges('');
    };

    const updateChanges = (event: any) => {
        event.preventDefault();
        updateChangesUser(changes);
        setTimeout(() => {
            removeField();
            setIsOpenBox(false);
        }, 3000);
    }

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
                                            <TableCellTheme align={'left'}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    {row.jobTitle ? row.jobTitle : null}{<JobTitleModal idUser={row._id} />}
                                                </Box>

                                            </TableCellTheme>
                                            <TableCellTheme align={'center'}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                    {row.changes ? row.changes : null}<EditIcon sx={{ color: '#0582a1' }} fontSize="small" onClick={() => handleEditChanges(row._id)} />
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

            {isOpenBox && <ItemGrid xl={6} md={6} sm={6} xs={6} sx={{
                display: 'flex',
                alignItems: 'center', flexDirection: 'column', gap: '10px',
                '& :first-of-type': { paddingTop: '5px' }
            }}>
                <form
                    onSubmit={updateChanges}
                    id='form-users-list' >

                    <FormControl fullWidth>
                        <InputLabel id="changes-simple-select-label">Установить разрешение</InputLabel>
                        <Select
                            labelId="changes-simple-select-label"
                            id="changes-simple-select"
                            value={changes}
                            label="Age"
                            onChange={handleChangeSelect}
                        >
                            {selectUsersChanges.map((item, i) => <MenuItem
                                key={i} value={item}>{item}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <Box sx={{ mb: 1, mr: 1, display: 'flex', justifyContent: 'right', gap: '20px', marginTop: '1em' }}>
                        <HeaderButton
                            variant="contained"
                            size="small"
                            type="button"
                            onClick={removeField}
                        >
                            Очистить поля
                        </HeaderButton>
                        <HeaderButtonActive
                            variant="contained"
                            size="small"
                            type={'submit'}
                            disabled={isChangesUserLoading}
                        >
                            {'Обновить'}
                        </HeaderButtonActive>
                    </Box>
                </form>
                {errorState ? <p>{`${errorState}`}</p> : null}
                {isSuccesChanges ? <p>Изменения сохранены!</p> : null}
            </ItemGrid>
            }
        </Box>

    )
}

