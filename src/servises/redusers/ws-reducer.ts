import { createReducer } from "@reduxjs/toolkit";
//import { TwsOrdersList } from "../../utils/types";
import {
    wsError,
    wsClose,
    wsMessage,
    wsConnect,
    wsOpen
} from '../actions/ws-actions';

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export type TLiveSocketStore = {
    status: WebsocketStatus;
    connectionError: string;
    messages: any[] | null;

}


export const initialState: TLiveSocketStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    messages: []
}


export const rootSocetReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnect, (state, action) => {
            state.status = (WebsocketStatus.CONNECTING, action.payload)
        })
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsError, (state, action) => {
            state.connectionError = action.payload
        })
        .addCase(wsMessage, (state, action) => {
            state.messages = ([...state.messages!, { ...action.payload }])
        })
});
