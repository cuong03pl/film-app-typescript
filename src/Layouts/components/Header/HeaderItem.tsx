import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface HeaderItem {
    to: string,
    Icon?: ReactNode
    title: string
}

function HeaderItem({ to, Icon, title }: HeaderItem) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "flex items-center px-2 py-3 text-[#5985FF]"
          : "flex items-center px-2 py-3 text-textPrimary"
      }
    >
      {Icon}
      <span className="font-medium text-base">{title}</span>
    </NavLink>
  );
}

export default HeaderItem;
