import { Link, Outlet } from "react-router-dom";
import { Menu } from "../../component/Menu";

export const Layout = () => {
  return (
    <div>
      <Menu />
      <Outlet />
    </div>
  );
};
