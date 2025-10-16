import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import 'bulma/css/bulma.min.css';
import './App.css';

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </StrictMode>
);
