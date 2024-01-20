import { User } from "@firebase/auth";
import { Firestore } from "firebase/firestore";
import { ChangeEvent, ChangeEventHandler, FormEvent, SetStateAction } from "react";

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
    target: {
        files?: any; value: SetStateAction<string> 
},
}

export interface IChecked {
    name: string,
    checked: boolean,
    id: string| number,
}

export interface ILocationState {
    from?: string;
    back: () => void;
}

export type GlobalContent = {

    toggleColorMode: () => void;
}

export interface IAuthContext {
    userBaseData: User | null,
    isLoading: boolean,
    register: (email: string, password: string) => Promise<void>,
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    uid?: string,
}
export interface IUserAuth {
    email: string,
    name: string,
    _id: string,
    avatar: any,
    createdAt: string,
}
export interface IProfile {
    _id: string;
    displayName: string;
    docId: string;
    user?: any;
    email?: string;
    photoURL?: string;
    jobTitle?: string;
    changes?: string;
}
export interface IFieldObj {
    h2Data: string;
    idForm: string;
    onSubmit: { (event: React.FormEvent<HTMLFormElement>): any };
    label?: string[];
    valueMass?: string[];
    type: string[];
    idTextField?: string[];
    onChange: ((event: IOnChangeEvent) => void)[];
    removeField: any;
    buttonText: string;
    name?: string[];
    isLoading?: boolean;
}
export interface IFieldCreateNew {
    arrayField: IFieldObj[]
}
export interface IInputAdorments {
    passwordInput?: boolean;
    keyInput?: string,
    idInput?: any,
    placeholderInput?: string,
    valueInput?: string,
    onChangeInput?: any,
    typeInput?: string,
    nameInput?: string,
    ariaLabelInput?: string,
}

export interface IDirectionsLists7 {
    name: string,
    profile: 'string',
}

export interface ITasksUser {
    whoAddedTheTaskUserId: string,
    confirmDoneManager: string,
    executorTaskId: string,
    number: number,
    pendingConfirm: string,
    statusEditDoc: boolean,
    _id?: string,
    nameTask: string,
    taskDescription: string,
    taskDirection: string,
    taskStatus: string,
    timeAdding: string,
}