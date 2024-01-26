// import todoReducer from '../slices/task-slice';
import { combineReducers } from 'redux';
import { filterDataReducer } from './filter-data-reducer';
import { userReducer } from './user-reducer';
import { rootSocetReducer } from './ws-reducer';
import { tasksApi } from '../rtk-query/tasks-api';
import directionReduser from '../slices/task-slice';
import {IDReducer } from './id-task-user-board-reducer';





export const rootReducer = combineReducers({
  [tasksApi.reducerPath]: tasksApi.reducer,
  userData: userReducer,
  chatUser: rootSocetReducer,
  dataLists: directionReduser,
  filterData: filterDataReducer,
  idTaskTarget: IDReducer,
});
