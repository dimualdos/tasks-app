// import todoReducer from '../slices/task-slice';
import { combineReducers } from 'redux';
import { filterDataReducer } from './filter-data-reduser';
import { userReducer } from './user-reducer';
import { rootSocetReducer } from './ws-reduser';
import { tasksApi } from '../rtk-query/tasks-api';
import directionReduser from '../slices/task-slice'



export const rootReducer = combineReducers({
  [tasksApi.reducerPath]: tasksApi.reducer,
  userData: userReducer,
  chatUser: rootSocetReducer,
  dataLists: directionReduser,
  filterData: filterDataReducer,
});
