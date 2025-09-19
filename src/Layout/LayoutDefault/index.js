import "./layoutDefault.scss";
// import { NavLink, Outlet } from "react-router-dom";
// import { getCookie } from "../../helpers/cookie";
// import { deleteCookie } from "../../helpers/cookie";
// import Header from "./Header";
import Main from "./Main";
// import Footer from "./Footer";
function LayoutDefault() {
  // const token = getCookie("token");

  return (
    <>
      <div className="Layout-default">
        <Main />
      </div>
    </>
  );
}
export default LayoutDefault;
