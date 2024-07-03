import React, { useEffect, useState } from "react";

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
  NavLinkContainer,
  StyledNavLink,
} from "./SideNavBar.style";

import { lightBackground } from "../../colors";

import Filter from "../../images/filter-icon.png";
import { Icon } from "../searchbar/SearchBar.style";
import Search from "../../images/search-icon-white.png";
import Arrow from "../../images/arrow-icon.png"

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
      {!activeSideBar ? (
        <HeaderContainer>
          <HamburgerIcon onClick={toggleSidebar}>
            <HiBars3 />
            <div>Discover</div>
          </HamburgerIcon>
          <SearchBarContainer>
            <SearchBar isYearRequired={false} inputColor={lightBackground} />
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
            style={{ fontWeight: '600' }}
          >
            Wesley
            <NavIcon>
              <Icon src={Arrow} alt="search Icon" />
            </NavIcon>
          </SideNavMainLink>

      
          <SideNavMainLink
            className="menu_nav_link"
            to="/discover"
            activeClassName="active"
            
          >
            Discover
            <NavIcon>
              <Icon src={Search} alt="search Icon" />
            </NavIcon>
          </SideNavMainLink>

          <SideNavHeader>
            <HeaderText>Watched</HeaderText>
          </SideNavHeader>
          <NavLinkContainer>
            <StyledNavLink
              className="menu_nav_link"
              to="/watched/movies"
              activeClassName="active"
            >
              Movies
            </StyledNavLink>

            <StyledNavLink
              className="menu_nav_link"
              to="/watched/tv-shows"
              activeClassName="active"
            >
              Tv Shows
            </StyledNavLink>
          </NavLinkContainer>
          <SideNavHeader>
            <HeaderText>Saved</HeaderText>
          </SideNavHeader>
          <NavLinkContainer>
            <StyledNavLink
              className="menu_nav_link"
              to="/saved/movies"
              activeClassName="active"
            >
              Movies
            </StyledNavLink>
            <StyledNavLink
              className="menu_nav_link"
              to="/saved/tv-shows"
              activeClassName="active"
            >
              Tv Shows
            </StyledNavLink>
          </NavLinkContainer>
        </SideNavBarCont>
      ) : null}
    </>
  );
}
