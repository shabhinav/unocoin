import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./Store/reducer";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
