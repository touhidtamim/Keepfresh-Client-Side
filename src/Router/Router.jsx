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
import NotFoundPage from "../Components/NotFound";
import PrivacyPolicy from "../Pages/Legal/PrivacyPolicy";
import FAQ from "../Components/FAQ";
import TermsAndConditions from "../Pages/Legal/TermsAndConditions";
import Notification from "../Pages/Notification/Notification";
import PrivateRouter from "./PrivateRouter";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";

// Dashboard related
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import OverviewPage from "../Pages/Dashboard/OverViewPage";
import ExpiredItems from "../Pages/Home/ExpiredItems";
import ProfileCard from "../Pages/Dashboard/ProfileCard";
import AddFood from "../Pages/AddFood/AddFood";
import MyItems from "../Pages/MyItems/MyItems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/fridge", element: <Fridge /> },
      { path: "/items/:id", element: <FoodDetails /> },
      {
        path: "/notifications",
        element: (
          <PrivateRouter>
            <Notification />
          </PrivateRouter>
        ),
      },
      { path: "/blog", element: <Blog /> },

      // ✅ Dashboard with children
      {
        path: "/dashboard",
        element: (
          <PrivateRouter>
            <DashboardLayout />
          </PrivateRouter>
        ),
        children: [
          { index: true, element: <OverviewPage /> },
          { path: "my-profile", element: <ProfileCard /> },
          { path: "add-foods", element: <AddFood /> },
          { path: "my-foods", element: <MyItems /> },
          { path: "expired-items", element: <ExpiredItems /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },

      { path: "/about", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <LogIn /> },
      { path: "/forgot-password", element: <ForgetPassword /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms&condition", element: <TermsAndConditions /> },
    ],
  },
]);

export default router;
