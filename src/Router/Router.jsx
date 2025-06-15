import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Fridge from "../Pages/Fridge";
import AboutUs from "../Pages/About/AboutUs";
import Blog from "../Pages/Blog";
import Contact from "../Pages/Contact/Contact";
import Register from "../Pages/Authentication/Register";
import LogIn from "../Pages/Authentication/LogIn";
import ForgetPassword from "../Pages/Authentication/ForgetPassword";
import NotFoundPage from "./../Components/NotFound";
import PrivacyPolicy from "../Components/PrivacyPolicy";
import TermsAndConditions from "../Components/TermsAndConditions";
import AddFood from "../Pages/AddFood/AddFood";
import MyItems from "../Pages/MyItems/MyItems";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Notification from "../Pages/Notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/fridge",
        element: <Fridge />,
      },

      {
        path: "/add-food",
        element: <AddFood />,
      },

      {
        path: "/my-items",
        element: <MyItems />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },

      {
        path: "/notifications",
        element: <Notification />,
      },

      {
        path: "/blog",
        element: <Blog />,
      },

      {
        path: "/about",
        element: <AboutUs />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/login",
        element: <LogIn />,
      },

      {
        path: "/forgot-password",
        element: <ForgetPassword />,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },

      {
        path: "/terms&condition",
        element: <TermsAndConditions />,
      },
    ],
  },
]);

export default router;
