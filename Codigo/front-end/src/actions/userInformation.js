import * as types from "../types/user";
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

export const changePage = () => ({
    type: types.CHANGE_LOGIN_PAGE
});

export const sendUserInformation = (userLoginData) => async (dispatch) => {
dispatch(sendUserInformationRequest());
try {
    const { data } = await axios.post(
        `trabalhador/login`,
        { usuario: userLoginData }
      );
      dispatch(sendUserInformationSuccess(data));
} catch(error) {
    dispatch(sendUserInformationFailure(error));
}
}

export const createUserInformationSuccess = () => ({
    type: types.CREATE_USER_INFORMATION_SUCCESS
});

export const createUserInformationRequest = () => ({
    type: types.CREATE_USER_INFORMATION_REQUEST
});

export const createUserInformationFailure = (error) => ({
    type: types.CREATE_USER_INFORMATION_FAILURE,
    error
})

export const createUserInformation = (userData) => async (dispatch) => {
    dispatch(createUserInformationRequest());
    try {
        const { data } = await axios.post(`https://localhost:8080/trabalhador/register/`, userData);
        dispatch(createUserInformationSuccess());
    } catch(error) {
        dispatch(createUserInformationFailure(error));
    }
}