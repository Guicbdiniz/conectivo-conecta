import { registerRootComponent } from "expo";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import App from "./App.jsx";

const store = configureStore();

const MyApp = () => (
  <Provider store={store}>
      <App />
  </Provider>
);

registerRootComponent(MyApp);
