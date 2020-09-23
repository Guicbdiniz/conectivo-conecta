import React from "react";
import { LoginForm } from "../../components/LoginForm";
import { useDispatch } from "react-redux";
import { sendUserInformation, changePage } from "../../actions/userInformation";
const LoginFormContainer = () => {
    const dispatch = useDispatch();
    const handleFormSubmit = (userData) => {
        dispatch(sendUserInformation(userData));
    };
    const handleChangePage = () => {
        dispatch(changePage());
    };
    return (
    <LoginForm handleFormSubmit={(data) => handleFormSubmit(data)} handleSignUpClick={() => handleChangePage()}/>
    )
}

export default LoginFormContainer;
