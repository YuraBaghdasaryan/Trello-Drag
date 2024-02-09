import React from "react";
import { useRoutes } from "react-router-dom";
import { Profile } from "../pages/Profile";
import { Layout } from "../pages/layout/Layout";
import { Login } from "../pages/Login";
import { Userregister } from "../pages/UserRegister";
import { AddTask } from "../component/AddTask";

export const MyRouter: React.FC = React.memo(({}) => {
  const router = useRoutes([
    { path: "/", 
    element: <Layout /> ,
    children:[
        { path: "", element: <Login /> },
        { path: "register", element: <Userregister /> },
        { path: "Profile", element: <Profile /> },
    ]
},
    {
        path:"*",
        element:<h1>page not found</h1>
    }
  ]);
  return router;
});
