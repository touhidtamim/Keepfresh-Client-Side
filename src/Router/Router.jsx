import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Fridge from "../Pages/Fridge/Fridge";
import AboutUs from "../Pages/About/AboutUs";
import Blog from "../Pages/Blog/Blog";
import Contact from "../Pages/Contact/Contact";
import Register from "../Pages/Authentication/Register";
import LogIn from "../Pages/Authentication/LogIn";
import ForgetPassword from "../Pages/Authentication/ForgetPassword";
import NotFoundPage from "./../Components/NotFound";
import PrivacyPolicy from "../Pages/Legal/PrivacyPolicy";
import FAQ from "../Components/FAQ";
import TermsAndConditions from "../Pages/Legal/TermsAndConditions";
import AddFood from "../Pages/AddFood/AddFood";
import MyItems from "../Pages/MyItems/MyItems";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Notification from "../Pages/Notification/Notification";
import PrivateRouter from "./PrivateRouter";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";

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
        path: "/items/:id",
        element: (
          <PrivateRouter>
            <FoodDetails />
          </PrivateRouter>
        ),
      },

      {
        path: "/add-food",
        element: (
          <PrivateRouter>
            <AddFood />
          </PrivateRouter>
        ),
      },

      {
        path: "/my-items",
        element: (
          <PrivateRouter>
            <MyItems />
          </PrivateRouter>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
      },

      {
        path: "/notifications",
        element: (
          <PrivateRouter>
            <Notification />
          </PrivateRouter>
        ),
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
        path: "/faq",
        element: <FAQ />,
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
