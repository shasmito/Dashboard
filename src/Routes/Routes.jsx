import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import NoticePage from "../Pages/Notice/NoticePage";
import DashboardIndex from "../Pages/HomePage/DashboardIndex";
import ResearchPage from "../Pages/Research/ResearchPage";

export const route = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "dashboard",
                element: <DashboardIndex/>,
                children: [
                    {
                        path: "",
                        element: <HomePage />,
                    },
                    {
                        path: "notice",
                        element: <NoticePage />,
                    },{
                        path:"research",
                        element:<ResearchPage />,
                    }
                ]
            }

        ]
    }
]);
