import {
    STATUS_DATA,
    DIRECTIONS_DATA,
    EXECUTOR_DATA,
} from '../constants/filter-data-constants'

interface ITaskReduser {
    statusListData: [],
    directionsListData: [],
    executorsListData: [],
}

export const initialState: ITaskReduser = {
    statusListData: [],
    directionsListData: [],
    executorsListData: [],
}


export const filterDataReducer = (state = initialState, action: { type: string; payload: []; }) => {
    switch (action.type) {

        case STATUS_DATA: {
            return {
                ...state,
                statusListData: action.payload,
            };
        }
        case DIRECTIONS_DATA: {
            return {
                ...state,
                directionsListData: action.payload,
            };
        }
        case EXECUTOR_DATA: {
            return {
                ...state,
                executorsListData: action.payload,
            };
        }

        default: {
            return state
        }
    }
}

