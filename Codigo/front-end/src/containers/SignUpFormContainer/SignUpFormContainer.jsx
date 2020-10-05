import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { useDispatch } from "react-redux";
import { createUserInformation } from "../../actions/userInformation";
const LoginFormContainer = () => {
    const dispatch = useDispatch();
    const handleFormSubmit = (userData) => {
        console.log(userData);
        dispatch(createUserInformation(userData));
    }
    return (
    <SignUpForm handleSubmitData={(data) => handleFormSubmit(data)}/>
    )
}

export default LoginFormContainer;
