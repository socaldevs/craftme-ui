import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import allReducers from "./reducers/index.jsx";
import { composeWithDevTools } from "redux-devtools-extension";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App.jsx';

const store = createStore(allReducers, composeWithDevTools());
console.log('this is what store looks like!', store.getState());

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("app")
);
