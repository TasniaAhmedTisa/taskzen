import React from "react";
import * as ReactDOM from "react-dom/client";

import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import AddTask from "./AddTask";
import Manage from "./Manage";
import Login from "./Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: '/addtask',
    element:<AddTask></AddTask>
  },
  {
    path: "/manage",
    element:<Manage></Manage>
  },
  {
    path: "/login",
    element:<Login></Login>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);
