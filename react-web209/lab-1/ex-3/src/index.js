// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Menu from "./Menu.js";
import MainContent from "./MainContent.js";
// import reportWebVitals from "./reportWebVitals";

// ReactDOM.render(<Header />, document.querySelector("#header"));
// ReactDOM.render(<Footer />, document.querySelector("#footer"));
// ReactDOM.render(<Menu />, document.querySelector("#menu"));
// ReactDOM.render(<MainContent />, document.querySelector("#root"));

ReactDOM.createRoot(document.getElementById("header")).render(<Header />);
ReactDOM.createRoot(document.getElementById("footer")).render(<Footer />);
ReactDOM.createRoot(document.getElementById("menu")).render(<Menu />);
ReactDOM.createRoot(document.getElementById("root")).render(<MainContent />);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
