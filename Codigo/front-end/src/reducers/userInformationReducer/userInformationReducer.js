import * as types from "../../types/user";
import { produce } from "immer";
import { AxiosError } from "axios";

type State = {
  userInformation: {},
  loading: boolean,
  error: AxiosError,
  login?: boolean
};

const initialState: State = {
  userInformation: {},
  loading: false,
  error: null,
  login: true
};

export default (state: State = initialState, action: any = {}) =>
  produce(state, (draft) => {
    const newDraft = draft;
    switch (action.type) {
      case types.SEND_USER_INFORMATION_FAILURE:
        newDraft.error = action.error;
        newDraft.loading = false;
        break;
      case types.SEND_USER_INFORMATION_REQUEST:
        newDraft.loading = true;
        break;
      case types.SEND_USER_INFORMATION_SUCCESS:
        newDraft.userInformation = action.payload;
        break;
      case types.CHANGE_LOGIN_PAGE:
        newDraft.login = !newDraft.login;  
        break;
      default:
        break;
    }
  });
