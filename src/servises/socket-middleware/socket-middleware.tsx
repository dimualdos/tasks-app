import type { Middleware } from 'redux';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import type { RootState } from '../types/index';

export type TwsActionTypes = {
    connect: ActionCreatorWithPayload<string>,
    wsConnectingSuccess: ActionCreatorWithoutPayload,
    wsOpen: ActionCreatorWithoutPayload,
    wsMessage: ActionCreatorWithPayload<[]>,
    wsSendMessage: ActionCreatorWithPayload<string>,
    wsClose: ActionCreatorWithoutPayload,
    disconnect: ActionCreatorWithoutPayload,
    wsError: ActionCreatorWithPayload<string>,
}


export const socketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url = '';
        let isConnected = false;

        // let reconnectTimer = 0

        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload }: any = action;

            // console.log(type)

            const {
                connect, disconnect, wsClose, wsConnectingSuccess, wsError, wsMessage, wsOpen
            } = wsActions
            const user: any = getState().userData.user!;

            if (connect.match(action)) {
                url = action.payload;

                //  console.log(url);
                socket = new WebSocket(url)
                isConnected = true
                // window.clearTimeout(reconnectTimer)
                dispatch(wsConnectingSuccess())
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(wsOpen())
                }

                socket.onerror = () => {
                    dispatch(wsError('Websocket error'))
                }

                socket.onmessage = (event: MessageEvent) => {
                    const { data } = event
                    const parsedData = JSON.parse(data)
                    dispatch(wsMessage(parsedData))
                }

                if (type === `WS_SEND`) {
                    const message = { message: payload, token: user!.token };
                    console.log(JSON.stringify(message))
                    socket.send(JSON.stringify(message));
                }

                socket.onclose = (event) => {
                    if (event.code !== 1000) {
                        dispatch(wsError(event.code.toString()))
                    }

                    if (isConnected) {
                        dispatch(wsConnectingSuccess())
                        // reconnectTimer = window.setTimeout(() => {
                        //     dispatch(connect(url))
                        // }, 3000)
                    }
                }

                if (disconnect.match(action)) {
                    // window.clearTimeout(reconnectTimer)
                    isConnected = false
                    // reconnectTimer = 0
                    dispatch(wsClose())
                    socket.close()
                }
            }
            next(action)
        }
    }
}
