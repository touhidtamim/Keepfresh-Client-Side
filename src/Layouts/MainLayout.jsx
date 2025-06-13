import Spinner from "../Components/Spinner";
import Navbar from "../Components/Navbar";
import ScrollToTop from "./../Components/ScrollToTop";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Navbar></Navbar>

      <ScrollToTop></ScrollToTop>

      {navigation.state === "loading" && <Spinner />}

      <div className="bg-[#f9fbfc] min-h-[90vh]">
        <Outlet />
      </div>

      <Footer></Footer>
    </>
  );
};

export default MainLayout;
