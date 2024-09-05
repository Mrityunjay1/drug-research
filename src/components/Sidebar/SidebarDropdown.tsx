import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();

  return (
    <>
      <ul className="flex flex-col gap-2">
        {item.map((subItem: any, index: number) => (
          <li key={index}>
            <Link
              href={subItem.route}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-300 ease-in-out
              ${
                pathname === subItem.route
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:bg-indigo-700/30 hover:text-white"
              }`}
            >
              <span
                className={`${pathname === subItem.route ? "text-white" : "text-gray-500"}`}
              >
                {subItem.icon}
              </span>
              <span>{subItem.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarDropdown;
