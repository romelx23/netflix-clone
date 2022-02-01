import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { NetflixApp } from "./NetflixApp";
import { AuthProvider } from "./context/authContext";
import { ListProvider } from "./context/listContext";

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <ListProvider>
        <NetflixApp />
      </ListProvider>
    </AuthProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
