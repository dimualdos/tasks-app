import { createAction } from "@reduxjs/toolkit";
// import { TwsOrdersList } from "../../utils/types";


//!!Redux Toolkit
export const wsConnect = createAction<any, 'WS_CONNECT'>('WS_CONNECT');
export const wsConnectingSuccess = createAction('WS_CONNECTION_SUCCESS');
export const wsOpen = createAction('WS_CONNECTION_OPEN');
export const wsMessage = createAction<[], 'WS_MESSAGE'>('WS_MESSAGE');
export const wsSendMessage = createAction<any, 'WS_SEND'>('WS_SEND');
export const wsClose = createAction('WS_CONNECTION_CLOSED');
export const wsDisconnect = createAction('WS_DISCONNECT');
export const wsError = createAction<string, 'WS_CONNECTION_ERROR'>('WS_CONNECTION_ERROR');


export type TWSConnectActions = ReturnType<typeof wsConnect>
  | ReturnType<typeof wsConnectingSuccess>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsSendMessage>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsDisconnect>
  | ReturnType<typeof wsError>;


// export const wsUserNameUpdate = (userName: string) => {
//   return {
//     type: WS_USER_NAME_UPDATE,
//     payload: userName
//   };
// };
