import { IChecked } from '../../utils/types';
import { STATUS_DATA, DIRECTIONS_DATA, EXECUTOR_DATA } from '../constants/filter-data-constants';
import { AppDispatch } from '../types';


export interface IStatusListDataAction {
    readonly type: typeof STATUS_DATA;
    readonly payload: IChecked;
}
export interface IDirectionsListDataActions {
    readonly type: typeof DIRECTIONS_DATA;
    readonly payload: IChecked;
}
export interface IExecutorListDataAction {
    readonly type: typeof EXECUTOR_DATA;
    readonly payload: IChecked;
}

export type TFilterDataActions =
    | IStatusListDataAction
    | IDirectionsListDataActions
    | IExecutorListDataAction;



export const setFilterStatus = (data: IChecked) => {
    return {
        type: STATUS_DATA,
        payload: data,
    }
};

export const setFilterDirection = (data: IChecked) => {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: DIRECTIONS_DATA,
            payload: data,
        })
    }
};

export const setFilterExecutor = (data: IChecked) => {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: EXECUTOR_DATA,
            payload: data,
        })
    }
};

