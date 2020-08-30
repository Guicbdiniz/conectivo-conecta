import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./src/reducers/rootReducer";

export default function configureStore(initialState = {}) {
  const middlewares = [thunk];
  const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  return createStore(rootReducer, enhancer);
}
