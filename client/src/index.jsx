import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import allReducers from "./reducers/index.jsx";

import App from "./components/App.jsx";

const store = createStore(allReducers);
console.log("this is what store looks like!", store.getState());

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("app")
);
