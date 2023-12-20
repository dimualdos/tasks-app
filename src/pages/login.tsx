import { useCallback, FunctionComponent, FormEvent } from 'react';
import { useForm, useAuth } from '../hooks/hooks';
import styles from './css/pages.module.css';
import TextField from '@mui/material/TextField';
import { HeaderButtonActive } from '../constants/constant-mui';


export const LoginPage: FunctionComponent = () => {
    const { login } = useAuth();
    const { isLoading } = useAuth();
    const { values, handleChange } = useForm({ email: '', password: '' });

    const handleClick = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = values;
        await login(email, password);
    }, [login, values]);

    return (
        <section className={styles.centrContainer}>
            <div className={styles.container}>
                <form
                    onSubmit={handleClick}
                    className={styles.form}>
                    <h1 className={styles.heading}>Вход</h1>
                    <TextField
                        placeholder="E-mail"
                        value={values.email}
                        name="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

                    <TextField
                        placeholder="Пароль"
                        value={values.password}
                        name="password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    />
                    <HeaderButtonActive
                        type='submit'
                        className={styles.buttonConstructor}>
                        <p className={styles.buttonText}>Войти</p>
                    </HeaderButtonActive>
                </form>

                {/* <div className={styles.containerBottom}>
                    <div className={styles.divPerson}>
                        <p className={styles.textPerson}>Вы - новый пользователь?
                            <Link to={{ pathname: `/register` }}
                                className={styles.textLinkPerson}> Зарегистрироваться</Link>
                        </p>
                    </div>

                    <div className={styles.divPerson}>
                        <p className={styles.textPerson}>Забыли пароль?
                            <Link to={{ pathname: `/forgot-password` }}
                                className={styles.textLinkPerson}> Восстановить пароль</Link>
                        </p>
                    </div>
                </div> */}

            </div>
        </section>

    )
}
