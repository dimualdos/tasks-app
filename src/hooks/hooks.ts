import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../servises/store';

import { useContext, useState } from "react";
import { AuthContext } from '../servises/context';
export type TDict<T> = {
    [name: string]: T;
};
interface IUseForm {
       email?: string;
       password?: string;
       name?: string; 
       photoURL?: string;
       uid?: string;
       token?: string;
       status?: string;
       direction?: string
     }


export const useForm = (inputValues: any) => {
    const [dataForm, setDataForm] = useState<any>(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setDataForm({ ...dataForm, [name]: value });
    };
    return { dataForm, handleChange, setDataForm };
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => useContext(AuthContext);

