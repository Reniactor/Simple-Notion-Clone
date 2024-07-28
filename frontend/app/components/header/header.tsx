"use client";
import { nunitoSans } from "@/app/utils/fontIndex";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GrNotes } from "react-icons/gr";
import { MdEventAvailable } from "react-icons/md";
import { RxArchive, RxHamburgerMenu, RxHome } from "react-icons/rx";

const SideBar = () => {
  const navMenuIconsClasses = "w-5 h-5";
  const [isNavVisible, setIsNavVisible] = useState(false);

  const navMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideMenu = (event: MouseEvent) => {
    if (
      navMenuRef.current &&
      !navMenuRef.current.contains(event.target as Node)
    ) {
      setIsNavVisible(false);
    }
  };

  useEffect(() => {
    if (isNavVisible) {
      document.addEventListener("mousedown", handleClickOutsideMenu);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [isNavVisible]);

  const handleNavMenuVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  const links = [
    {
      icon: <RxHome className={navMenuIconsClasses} />,
      name: `Home`,
      route: "/",
    },
    {
      icon: <GrNotes className={navMenuIconsClasses} />,
      name: `All notes`,
      route: "/?filter=all",
    },
    {
      icon: <MdEventAvailable className={navMenuIconsClasses} />,
      name: `Active`,
      route: "/?filter=active",
    },
    {
      icon: <RxArchive className={navMenuIconsClasses} />,
      name: `Archived`,
      route: "/?filter=archived",
    },
  ];

  return (
    <>
      <nav
        className={`${nunitoSans.className} hidden sm:flex flex-col gap-8 p-6 min-h-screen -translate-x-full sm:translate-x-0 transition-transform duration-200 fixed top-0 left-0 w-56 bg-sidebarBackground text-xl lowercase font-bold`}
      >
        {links.map(({ icon, name, route }, index) => {
          return (
            <Link
              key={index}
              href={route}
              className="flex gap-2 items-center w-fit"
            >
              {icon}
              {name}
            </Link>
          );
        })}
      </nav>
      <nav className="fixed top-4 right-4 sm:hidden hover:bg-cardsBackground duration-300 transition-colors">
        <RxHamburgerMenu
          onClick={handleNavMenuVisibility}
          className="h-6 w-6"
        />
        <menu
          ref={navMenuRef}
          className={`${
            isNavVisible ? "absolute flex" : "hidden"
          } flex-col justify-between p-2 top-4 right-0 w-32 h-52 bg-cardsBackground rounded-md`}
        >
          {links.map(({ icon, name, route }, index) => {
            return (
              <Link
                key={index}
                href={route}
                onClick={handleNavMenuVisibility}
                className="flex gap-2 items-center"
              >
                {icon}
                {name}
              </Link>
            );
          })}
        </menu>
      </nav>
    </>
  );
};
export default SideBar;
