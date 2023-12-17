import { _userJoinChat } from '../../utils/srm-api';
import { IUserData } from '../../utils/types';
import {
  JOIN_CHAT_REQUEST,
  JOIN_CHAT_FAILED,
  JOIN_CHAT_SUCCESS
}
  from '../constants/chat-action-constants';
import { AppDispatch } from '../types';
// import { AppDispatch } from '../store';

export interface IRegisterUserRequestAction {
  readonly type: typeof JOIN_CHAT_REQUEST;
}
export interface IRegisterUserSuccessAction {
  readonly type: typeof JOIN_CHAT_SUCCESS;
  readonly user: IUserData;
}
export interface IRegisterUserFailedAction {
  readonly type: typeof JOIN_CHAT_FAILED;
}

export type TUserActions =
  | IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction;


export const joinChat = () => (dispatch: AppDispatch) => {
  dispatch({
    type: JOIN_CHAT_REQUEST
  });
  fetch(_userJoinChat)
    .then(res => res.json())
    .then(data => {
      const { success, ...userData } = data;

      console.log(userData)
      dispatch({
        type: JOIN_CHAT_SUCCESS,
        user: userData
      });

    }).catch((err) => {
      console.log(err);
      dispatch({
        type: JOIN_CHAT_FAILED
      })
    });
};


