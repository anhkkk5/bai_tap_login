import { Outlet } from "react-router-dom";
import "./layoutDefault.scss";
function Main() {
  return (
    <main className="layout-defaut__main">
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
}
export default Main;
