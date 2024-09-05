import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarDropdown from "./SidebarDropdown";

const SidebarItem = ({ item, pageName, setPageName }: any) => {
  const handleClick = () => {
    const updatePageName =
      pageName !== item.label.toLowercase() ? item.label.toLowercase() : "";
    return setPageName(updatePageName);
  };
  const pathname = usePathname();

  const isActive = (item: any) => {
    if (item.route === pathname) return true;
    if (item.children) {
      return item.children.some((child: any) => isActive(child));
    }
    return false;
  };
  const isItemActive = isActive(item);

  return (
    <>
      <li>
        <Link
          href={item.route}
          className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium transition-colors duration-300 ease-in-out
          ${
            isItemActive
              ? "bg-indigo-700 text-white"
              : "text-gray-300 hover:bg-indigo-700/50 hover:text-white"
          }`}
          onClick={handleClick}
        >
          <span
            className={`${isItemActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}
          >
            {item.icon}
          </span>
          <span className="whitespace-nowrap">{item.label}</span>
        </Link>
        {item.children && (
          <div
            className={`ml-4 mt-2 overflow-hidden transition-all duration-300 ease-in-out
            ${pageName !== item.label.toLowerCase() ? "max-h-0" : "max-h-screen"}`}
          >
            <SidebarDropdown item={item.children} />
          </div>
        )}
      </li>
    </>
  );
};

export default SidebarItem;
