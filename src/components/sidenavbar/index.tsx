import React, { useEffect, useState } from "react";
import { NavLink as Link, NavLink } from "react-router-dom";

import SearchBar from "../searchbar";
import { HiBars3 } from "react-icons/hi2";
import {
  HamburgerIcon,
  HeaderContainer,
  HeaderText,
  NavIcon,
  SideNavBarCont,
  SideNavHeader,
  SideNavMainLink,
  SearchBarContainer,
} from "./SideNavBar.style";

import Filter from "../../images/filter-icon.png";
import { Icon } from "../searchbar/SearchBar.style";

export default function SideNavBar() {
  const [activeSideBar, setActiveSideBar] = useState<boolean>(
    window.innerWidth >= 768
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setActiveSideBar(true);
      } else {
        setActiveSideBar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* Write the necessary functions to show/hide the side bar on mobile devices */

  const toggleSidebar = () => {
    setActiveSideBar(!activeSideBar);
  };

  // to hide the navbar on mobile devices drag the navbar from right to left like a swipe
  useEffect(() => {
    let startX: number;

    const handleTouchStart: EventListener = (e: Event) => {
      const touchEvent = e as TouchEvent;
      startX = touchEvent.touches[0].clientX;
    };

    const handleTouchMove: EventListener = (e: Event) => {
      const touchEvent = e as TouchEvent;
      if (!startX) return;

      const currentX = touchEvent.touches[0].clientX;
      const diffX = startX - currentX;

      if (diffX > 50) {
        setActiveSideBar(false);
      }
    };

    const sideNav = document.querySelector(".visible");
    if (sideNav) {
      sideNav.addEventListener("touchstart", handleTouchStart);
      sideNav.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      if (sideNav) {
        sideNav.removeEventListener("touchstart", handleTouchStart);
        sideNav.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [activeSideBar]);

  return (
    <>
        {!activeSideBar  ? (
          <HeaderContainer>
            <HamburgerIcon onClick={toggleSidebar}>
              <HiBars3 />
              <div>Discover</div>
            </HamburgerIcon>
            <SearchBarContainer>
              <SearchBar isYearRequired={false} />
              <Icon src={Filter} alt="Filter Icon" />
            </SearchBarContainer>
            </HeaderContainer>
        ) : null}
      
      {activeSideBar ? (
        <SideNavBarCont className="visible">
          <SideNavMainLink
            className="menu_nav_link main_nav_link"
            to="/"
            activeClassName="active"
            exact
          >
            Wesley
          </SideNavMainLink>

          <SideNavMainLink
            className="menu_nav_link"
            to="/discover"
            activeClassName="active"
          >
            Discover
            <NavIcon></NavIcon>
          </SideNavMainLink>
          <SideNavHeader>
            <HeaderText>Watched</HeaderText>
          </SideNavHeader>
          <NavLink
            className="menu_nav_link"
            to="/watched/movies"
            activeClassName="active"
          >
            Movies
          </NavLink>
          <NavLink
            className="menu_nav_link"
            to="/watched/tv-shows"
            activeClassName="active"
          >
            Tv Shows
          </NavLink>
          <SideNavHeader>
            <HeaderText>Saved</HeaderText>
          </SideNavHeader>
          <NavLink
            className="menu_nav_link"
            to="/saved/movies"
            activeClassName="active"
          >
            Movies
          </NavLink>
          <NavLink
            className="menu_nav_link"
            to="/saved/tv-shows"
            activeClassName="active"
          >
            Tv Shows
          </NavLink>
        </SideNavBarCont>
      ) : null}
    </>
  );
}
