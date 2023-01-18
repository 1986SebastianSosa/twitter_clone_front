import { Outlet } from "react-router-dom";
import AboutButton from "../aboutButton/AboutButton";

const Layout = () => {
  return (
    <>
      <AboutButton />
      <Outlet />
    </>
  );
};

export default Layout;
