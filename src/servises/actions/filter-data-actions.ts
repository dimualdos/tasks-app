import { IChecked } from '../../utils/types';
import { STATUS_DATA, DIRECTIONS_DATA, EXECUTOR_DATA, CREATOR_DATA } from '../constants/filter-data-constants';
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

export interface ICreatorListDataAction {
    readonly type: typeof CREATOR_DATA;
    readonly payload: IChecked;
}

export type TFilterDataActions =
    | IStatusListDataAction
    | IDirectionsListDataActions
    | IExecutorListDataAction
    | ICreatorListDataAction;



export const setFilterStatus = (data: IChecked) => {
    return {
        type: STATUS_DATA,
        payload: data,
    }
};

export const setFilterDirection = (data: IChecked) => {
    return {
            type: DIRECTIONS_DATA,
            payload: data,
        }
    };

export const setFilterExecutor = (data: IChecked) => {
   
       return {
            type: EXECUTOR_DATA,
            payload: data,
      
    }
};

export const setFilterCreator = (data: IChecked) => {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: CREATOR_DATA,
            payload: data,
        })
    }
}

