import Spinner from "../Components/Spinner";
import Navbar from "../Components/Navbar";
import ScrollToTop from "./../Components/ScrollToTop";
import Footer from "../Components/Footer";
import { Outlet, useNavigation } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <Navbar></Navbar>
      <ScrollToTop></ScrollToTop>
      <ToastContainer />
      {navigation.state === "loading" && <Spinner />}

      <div className="bg-[#f9fbfc] min-h-[90vh]">
        <Outlet />
      </div>

      <Footer></Footer>
    </>
  );
};

export default MainLayout;
