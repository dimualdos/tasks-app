import { User } from "@firebase/auth";
import { SetStateAction } from "react";

export interface ITasksItems {
    indexOf(arg0: never): any;
    id: string,
    fullNumber: string,
    link: string,
    name: string,
    number: number,
    description: string,
    taskStatus: { name?: string } | null,
    currentUser: { name?: string } | null,
    direction: { name?: string } | null,
}

export interface ITasksID {
    id: string,
    type: number,
    name: string,
    descripion: string,
    payload: [],
    level: number,
    src: string,
    authors: []
}

export interface IGetItemsTasks {
    data: ITasksID,
    success: boolean
}

export interface IUserData {
    id: string,
    token: string,
    username: string
}

export interface IOnChangeEvent {
    // preventDefault(): unknown;
    target: { value: SetStateAction<string> },
}

export interface IChecked {
    name: string,
    checked: boolean,
    id: string,
}

export interface ILocationState {
    from?: string;
    back: () => void;
}

export type GlobalContent = {

    toggleColorMode: () => void;
}

export interface IAuthContext {
    user: User | null,
    isLoading: boolean,
    register: (email: string, password: string) => Promise<void>,
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
}
export interface IUserAuth {
    email: string,
    name: string,
    _id: string,
    avatar: any,
    createdAt: string,
}


