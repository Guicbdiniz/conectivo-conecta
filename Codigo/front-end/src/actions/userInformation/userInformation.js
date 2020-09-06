import * as types from "types/user";
import axios from "axios";
 
export const sendUserInformationSuccess = (userInformation) => ({
    type: types.SEND_USER_INFORMATION_SUCCESS,
    payload: userInformation
});

export const sendUserInformationFailure = (error) => ({
    type: types.SEND_USER_INFORMATION_FAILURE,
    error
});

export const sendUserInformationRequest = () => ({
    type: types.SEND_USER_INFORMATION_REQUEST
});

export const sendUserInformation = (userLoginData) => (dispatch) => {
dispatch(sendUserInformationRequest());
try {
    const { data } = await axios.post(
        `backend/api/login`,
        userLoginData
      );
      dispatch(sendUserInformationSuccess(data));
} catch(error) {
    dispatch(sendUserInformationFailure(error));
}
}