import { IUserData } from '../../utils/types';
import { TUserActions } from '../actions/user-actions';
import {
  JOIN_CHAT_REQUEST,
  JOIN_CHAT_FAILED,
  JOIN_CHAT_SUCCESS
}
  from '../constants/chat-action-constants';

export type TInitialStateUserReduser = {
  joinRequest: boolean,
  joinFailed: boolean,
  user: IUserData
};

const initialState: TInitialStateUserReduser = {
  joinRequest: false,
  joinFailed: false,
  user: {
    id: '',
    token: '',
    username: ''

  }
};

export const userReducer = (state = initialState, action: TUserActions): TInitialStateUserReduser => {
  switch (action.type) {
    case JOIN_CHAT_REQUEST:
      return {
        ...state,
        joinFailed: false,
        joinRequest: true
      };

    case JOIN_CHAT_FAILED:
      return {
        ...state,
        joinFailed: true,
        joinRequest: false
      };

    case JOIN_CHAT_SUCCESS:
      return {
        ...state,
        user: {
          id: action.user.id,
          token: action.user.token,
          username: action.user.username
        },
        joinRequest: false
      };

    default:
      return state;
  }
};
