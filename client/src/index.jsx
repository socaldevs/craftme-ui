import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import allReducers from "./reducers/index.jsx";
import { composeWithDevTools } from "redux-devtools-extension";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { PersistGate } from 'redux-persist/es/integration/react'

import configureStore from './reducers/configureStore.jsx'

const { persistor, store } = configureStore()


import App from './components/App.jsx';

// const store = createStore(allReducers, composeWithDevTools());
console.log('this is what store looks like!', store.getState());

ReactDOM.render(
  
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  document.getElementById("app")
);
