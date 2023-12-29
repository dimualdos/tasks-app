import { useCallback, FunctionComponent, FormEvent } from 'react';
import { useForm, useAuth } from '../hooks/hooks';
import styles from './css/pages.module.css';
import Grid from "@mui/material/Unstable_Grid2";

import { HeaderButtonActive } from '../constants/constant-mui';
import { InputAdornments } from '../components/custom-input/custom-input';
import { Box } from '@mui/material';


export const LoginPage: FunctionComponent = () => {
    const { login, isLoading } = useAuth();
    const { dataForm, handleChange } = useForm({ email: '', password: '' });

    const handleClick = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = dataForm;
        await login(email, password);
    }, [login, dataForm]);

    return (
        <Grid container sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: "wrap"
        }} xs={12}
        >
            <Grid xs={4} sx={{ justifyContent: 'center' }}>
                <form
                    onSubmit={handleClick}
                    className={styles.form}>
                    <Grid sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px', ":first-child": { textAlign: 'center' },
                        ":last-child": { alignContent: "center" }
                    }} xl={12} md={8}>
                        <h1 >Вход</h1>

                        <InputAdornments
                            placeholderInput="E-mail"
                            valueInput={dataForm.email}
                            nameInput="email"
                            typeInput="email"
                            onChangeInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            ariaLabelInput="E-mail"
                        />
                        <InputAdornments
                            placeholderInput="Пароль"
                            valueInput={dataForm.password}
                            nameInput="password"
                            typeInput='password'
                            onChangeInput={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            ariaLabelInput="password"

                        />

                        <Box >
                            <HeaderButtonActive
                                type='submit'
                                className={styles.buttonConstructor}>
                                <p className={styles.buttonText}>Войти</p>
                            </HeaderButtonActive>

                        </Box>

                    </Grid>

                </form>
            </Grid>


        </Grid>

    )
}
