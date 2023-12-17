import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './redusers/index';
import { tasksApi } from './rtk-query/tasks-api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { socketMiddleware } from './socket-middleware/socket-middleware';
import {
  wsConnect,
  wsConnectingSuccess,
  wsOpen,
  wsClose,
  wsMessage,
  wsSendMessage,
  wsDisconnect,
  wsError,
} from "./actions/ws-actions";


const wsActions = {
  connect: wsConnect,
  wsConnectingSuccess: wsConnectingSuccess,
  wsOpen: wsOpen,
  wsMessage: wsMessage,
  wsSendMessage: wsSendMessage,
  wsClose: wsClose,
  disconnect: wsDisconnect,
  wsError: wsError,
};

const websocketMiddleware: any = socketMiddleware(wsActions);


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      tasksApi.middleware,
      websocketMiddleware,
    )
  }
});
setupListeners(store.dispatch);



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


