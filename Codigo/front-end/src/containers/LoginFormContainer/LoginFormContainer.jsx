import React from "react";
import { LoginForm } from "../../components/LoginForm";
import { useDispatch } from "react-redux";
import { sendUserInformation } from "../../actions/userInformation";
const LoginFormContainer = () => {
    const dispatch = useDispatch();
    const handleFormSubmit = (userData) => {
        dispatch(sendUserInformation(userData));
    }
    return (
    <LoginForm handleFormSubmit={(data) => handleFormSubmit(data)}/>
    )
}

export default LoginFormContainer;
