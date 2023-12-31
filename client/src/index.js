import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import { AuthProvider } from "./pages/AuthContext/AuthContext";
import "slick-carousel/slick/slick.css";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import "./index.css";
import { persistor, store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        {/* <AuthProvider> */}
          <App />
        {/* </AuthProvider> */}
    </PersistGate>
  </Provider>
  </BrowserRouter>
);
