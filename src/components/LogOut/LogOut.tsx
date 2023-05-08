import { Link } from "react-router-dom";

import { LogOutIcon } from "../Icon/Icon";
import { auth } from "../../firebase/config";
import config from "../../config";

function LogOut() {
  const handleLogOut = () => {
    return auth.signOut().then(
      function () {
        window?.location?.reload();
      },
      function (error) {}
    );
  };
  return (
    <Link
      to={config.routes.home}
      className="flex items-center px-2 py-3 text-white"
      onClick={handleLogOut}
    >
      <LogOutIcon className={"w-[25px] h-[25px] mr-3"} />
      <span className="font-medium text-base text-white">Đăng xuất</span>
    </Link>
  );
}

export default LogOut;
