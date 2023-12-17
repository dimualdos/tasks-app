import { useCallback, FunctionComponent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useForm, useAppDispatch } from '../hooks/hooks';
// import { TStateReducer } from '../services/reducers';
// import { loginUser } from '../services/actions/auth';
import styles from './css/page.module.css';
import TextField from '@mui/material/TextField';


export const LoginPage: FunctionComponent = () => {
    const dispatch: any = useAppDispatch();
    const { values, handleChange } = useForm({ email: '', password: '' });

    // const { loginUserRequest } = useSelector((state: TStateReducer) => state.user);

    const handleClick = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // if (loginUserRequest) return;
            // dispatch(loginUser(values));
        }, [dispatch, values]);

    return (
        <section className={styles.section}>
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
                    <button
                        type='submit'
                        className={styles.buttonConstructor}>
                        <p className={styles.buttonText}>Войти</p>
                    </button>
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