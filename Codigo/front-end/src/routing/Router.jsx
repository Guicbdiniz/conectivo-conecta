import { NativeRouter, Route, Switch, Redirect } from "react-router-native";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const Router = () => (
    <NativeRouter>
        <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signUp" component={SignUpPage} />
        <Redirect from="/" to="/login" />
        </Switch>
    </NativeRouter>
);

export default Router;
