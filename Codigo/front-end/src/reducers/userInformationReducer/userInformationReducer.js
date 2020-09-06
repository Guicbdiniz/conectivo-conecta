import * as types from "../../types/user";
import { produce } from "immer";
import { AxiosError } from "axios";

type State = {
  userInformation: {},
  loading: boolean,
  error: AxiosError,
};

const initialState: State = {
  userInformation: {},
  loading: false,
  error: null,
};

export default (state: State = initialState, action: any = {}) =>
  produce(state, (draft) => {
    const newDraft = draft;
    switch (action.type) {
      case types.SEND_USER_INFORMATION_FAILURE:
        newDraft.error = action.error;
        loading = false;
        break;
      case types.SEND_USER_INFORMATION_REQUEST:
        loading = true;
        break;
      case types.SEND_USER_INFORMATION_SUCCESS:
        newDraft.userInformation = action.payload;
        break;
      default:
        break;
    }
  });
