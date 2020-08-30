import { registerRootComponent } from "expo";

import React from "react";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import App from "./App";

const store = configureStore();

const MyApp = () => (
  <Provider store={store}>
      <App />
  </Provider>
);

registerRootComponent(MyApp);
