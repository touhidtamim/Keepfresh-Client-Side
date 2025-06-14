import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Fridge from "../Pages/Fridge";
import AboutUs from "../Pages/About/AboutUs";
import Blog from "../Pages/Blog";
import Contact from "../Pages/Contact/Contact";
import Register from "../Pages/Authentication/Register";
import LogIn from "../Pages/Authentication/LogIn";
import NotFoundPage from "./../Components/NotFound";
import PrivacyPolicy from "../Components/Banner/PrivacyPolicy";
import TermsAndConditions from "../Components/TermsAndConditions";

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
