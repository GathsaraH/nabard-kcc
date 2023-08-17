import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toggleSidebar } from "../../store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RiHome5Line } from "react-icons/ri";
import { BiSolidDashboard } from "react-icons/bi";
import { GoOrganization } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { AiTwotoneBank } from "react-icons/ai";
import { FaCodeBranch} from "react-icons/fa";
import {GrPerformance} from "react-icons/gr";
import  {BsArrowLeftRight} from "react-icons/bs"
import leftSidebarToggle from "../assets/icons/toggleSidebarLeft.svg";
import Image from "next/image";

const sidebarMenuOptions = [
  {
    title: "Home",
    link: "/",
    icon: <RiHome5Line size={25} />,
  },
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: <BiSolidDashboard size={25} />,
  },
  {
    title: "Organizations",
    icon: <GoOrganization size={25} />,
    subMenu: [
      {
        title: "Banks",
        link: "/organizations/banks",
      },
    ],
  },
  {
    title: "Nabard Employee",
    icon: <FiUsers size={25} />,
    subMenu: [
      {
        title: "Employee",
        link: "/users/employee",
      },
      {
        title: "Stakeholders",
        link: "/users/stakeholders",
      },
    ],
  },
  {
    title: "Reporting Banks",
    link: "/reporting/banks",
    icon: <AiTwotoneBank size={25} />,
  },
  {
    title: "Reporting Branches",
    link: "/reporting/branches",
    icon: <FaCodeBranch size={25} />,
  },
  {
    title: "Performance Data ",
    icon: <GrPerformance size={25} />,
    subMenu: [
      {
        title: "Bank Wise",
        link: "/performance/bank",
      },
      {
        title: "Branch Wise",
        link: "/performance/branch",
      },
    ],
  },
  {
    title: "Campaign",
    link: "/campaign",
    icon: <BsArrowLeftRight size={25} />,
  },
  
];

const Sidebar = () => {
  const router = useRouter();
  const [currentMenu, setCurrentMenu] = useState("");
  const themeConfig = useSelector((state) => state.themeConfig);
  const semidark = useSelector((state) => state.themeConfig.semidark);
  const toggleMenu = (value) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      `.sidebar ul a[href="' + window.location.pathname + '"]`,
    );
    if (selector) {
      selector.classList.add("active");
      const ul = selector.closest("ul.sub-menu");
      if (ul) {
        let ele = ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          // eslint-disable-next-line prefer-destructuring
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  const setActiveRoute = () => {
    const allLinks = document.querySelectorAll(".sidebar ul a.active");
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove("active");
    }
    const selector = document.querySelector(
      `.sidebar ul a[href="' + window.location.pathname + '"]`,
    );
    selector?.classList.add("active");
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  function SideMenuList(index, menuOption) {
    function ListItem(menuOption) {
      return (
        <li className=" mb-1 flex items-center  py-3 px-7 font-extrabold  hover:text-white hover:bg-primary">
          <svg
            className="hidden h-5 w-4 flex-none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <div className="flex items-center">
            {menuOption.icon}
            <Link className="ml-5" href={menuOption.link}>
            {menuOption.title}
            </Link>{" "}
            {/* Main */}
          </div>
        </li>
      );
    }

    function ListItem(menuOption) {
      const [isActive, setIsActive] = useState(false);

      useEffect(() => {
        const linkMatches = router.pathname === menuOption.link;
        setIsActive(linkMatches);
      }, [router.pathname, menuOption.link]);

      function goToPage() {
        router.push(menuOption.link);
      }


      return (
        <li className={`mb-1 flex items-center py-3 px-7 font-extrabold ${isActive}  hover:text-white ${isActive ? "hover:bg-primary" : "hover:bg-svg-background"}`}>
          <svg
            className="hidden h-5 w-4 flex-none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <div className="flex items-center">
            {menuOption.icon}
            <span className="ml-5" >
            <button onClick={goToPage} >  {menuOption.title}</button>
            </span>{" "}
            {/* main */}
          </div>
        </li>
      );
    }

    return (
      <React.Fragment key={index}>
        {menuOption.subMenu ? (
          <li
            className={`menu nav-item px-7 ${currentMenu === menuOption.title
                ? "active no-padding-x"
                : "hover:bg-svg-background group"
              }`}
          >
            <button
              type="button"
              className={`${currentMenu === menuOption.title ? "active" : ""
                } nav-link group w-full`}
              onClick={() => toggleMenu(menuOption.title)}
            >
              <div className="flex items-center">
                <div
                  className={`${currentMenu === menuOption.title ? "ml-4" : ""
                    }`}
                >
                  {menuOption.icon}
                </div>
                <li className="ml-5 py-2 font-extrabold  hover:text-white ">
                  {menuOption.title}
                </li>
              </div>
              <div
                className={
                  currentMenu === menuOption.title
                    ? "rotate-90 mr-5"
                    : "rtl:rotate-180"
                }
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5L15 12L9 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
            <AnimateHeight
              duration={300}
              height={currentMenu === menuOption.title ? "auto" : 0}
            >
              <ul className="sub-menu">
                {menuOption.subMenu.map((subMenuOption, subIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={subIndex}>
                    <Link href={subMenuOption.link}>
                      {t(subMenuOption.title)}
                    </Link>{" "}
                    {/* sub child link */}
                  </li>
                ))}
              </ul>
            </AnimateHeight>
          </li>
        ) : (
          ListItem(menuOption)
        )}
      </React.Fragment>
    );
  }
//get current menu
  return (
    <div className={semidark ? "dark" : ""}>
    {/* {console.log(`currentMenu`, currentMenu)} */} 
      <nav
        className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? "text-white-dark" : ""
          }`}
      >
        <div className="h-full bg-white dark:bg-black">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex-1 text-center text-primary text-2xl">
              <b>NabNext</b>
            </Link>
            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300  rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
              onClick={() => dispatch(toggleSidebar())}
            >
              <Image src={leftSidebarToggle} alt="leftSidebarToggle" />
            </button>{" "}
          </div>

          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 py-0 font-semibold pr-0">
              {sidebarMenuOptions.map((menuOption, index) =>
                // eslint-disable-next-line react/no-array-index-key
                SideMenuList(index, menuOption),
              )}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
