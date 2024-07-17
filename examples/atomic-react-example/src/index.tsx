import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Add these lines for web components support in older browsers
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js";
import "@webcomponents/webcomponentsjs/webcomponents-bundle.js";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
