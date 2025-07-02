import Spinner from "../Components/Spinner";
import ScrollToTop from "./../Components/ScrollToTop";
import { Outlet, useNavigation } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <ToastContainer />
      {navigation.state === "loading" && <Spinner />}

      <div className="bg-[#f9fbfc] dark:bg-gray-900 min-h-[90vh]">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;
