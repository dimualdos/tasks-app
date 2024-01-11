import { FC, useState } from "react";

import { Avatar, Box, Table, TableBody, TableContainer, TablePagination, TableRow } from "@mui/material";
import { useUsersList } from "../../hooks/use-usersList"
import { ItemGrid, TableCellTheme } from "../../constants/constant-mui";
import { IProfile } from "../../utils/types";
import { JobTitleModal } from "../../components/job-title-modal/job-title-modal";

const columns: string[] = ['Аватар', 'Имя', 'Почта', 'Должность'];

export const UsersList: FC = () => {

    const { usersListFB } = useUsersList();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <ItemGrid sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <thead>
                        <TableRow>
                            {columns.map((column, i: number) => (
                                <TableCellTheme
                                    key={i}
                                    align={'left'}
                                    style={{ minWidth: 170 }}
                                >
                                    {column}
                                </TableCellTheme>
                            ))}
                        </TableRow>
                    </thead>
                    <TableBody>
                        {usersListFB &&
                            usersListFB.map((row: IProfile, i: number) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
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
                                                {row.jobTitle ? row.jobTitle : null}{<JobTitleModal />}
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
    )
}

