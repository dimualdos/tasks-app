import { Dispatch, Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from '../store';
import { TUserActions } from '../actions/user-actions';
import { TWSConnectActions } from '../actions/ws-actions';
import { TFilterDataActions } from '../actions/filter-data-actions';





export type TApplicationActions = TUserActions
    | TWSConnectActions
    | TFilterDataActions
    ;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = Dispatch<TApplicationActions>;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;  
