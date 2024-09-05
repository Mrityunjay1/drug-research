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
          className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
            isItemActive ? "text-white" : ""
          }`}
          onClick={handleClick}
        >
          {item.icon}
          <span
            className={`whitespace-nowrap ${isItemActive ? "text-white" : ""}`}
          >
            {item.label}
          </span>
        </Link>
        {item.children && (
          <div
            className={`translate transform overflow-hidden ${pageName !== item.label.toLowercase() ? "hidden" : ""}`}
          >
            <SidebarDropdown item={item.children} />
          </div>
        )}
      </li>
    </>
  );
};

export default SidebarItem;
