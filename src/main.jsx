// src/main.jsx
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      
        <App />
    
    </Provider>

      </BrowserRouter>
  </StrictMode>
);
