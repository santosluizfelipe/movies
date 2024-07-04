import React, { useEffect, useState } from "react";
import SearchBar from "../searchbar";
import ExpandableFilters from "../expandablefilters";
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
  SearchFiltersContMobile,
} from "./SideNavBar.style";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import { lightBackground } from "../../colors";
import Filter from "../../images/filter-icon.png";
import { Icon } from "../searchbar/SearchBar.style";
import Search from "../../images/search-icon-white.png";
import Arrow from "../../images/arrow-icon.png";
import { fetchGenres } from "../../fetcher";
import { AxiosRequestConfig } from "axios";

interface State {
  genreOptions: { id: number; name: string }[];
  ratingOptions: { id: number; name: number }[];
  languageOptions: { id: string; name: string }[];
}

export default function SideNavBar() {
  const [activeSideBar, setActiveSideBar] = useState<boolean>(
    window.innerWidth >= 768
  );
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const [state, setState] = useState<State>({
    genreOptions: [],
    ratingOptions: [
      { id: 7.5, name: 7.5 },
      { id: 8, name: 8 },
      { id: 8.5, name: 8.5 },
      { id: 9, name: 9 },
      { id: 9.5, name: 9.5 },
      { id: 10, name: 10 },
    ],
    languageOptions: [
      { id: "GR", name: "Greek" },
      { id: "EN", name: "English" },
      { id: "RU", name: "Russian" },
      { id: "PO", name: "Polish" },
    ],
  });

  useEffect(() => {
    const options: AxiosRequestConfig = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjQwMWQ5ODE4MmQwNWE4MzMwOWQxYTljNDFlNmI1OCIsIm5iZiI6MTcxOTQwOTkwNC4wNTc4MjcsInN1YiI6IjY2N2FlNWY4ZTQ1NDcyMzBlMWEwYjI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._yuMI9W5WzJrBvA57G1vTIctvNmAQPSVNFD3o7wpMz8`,
      },
    };

    fetchGenres(setState, options);
  }, []);

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

  const toggleSidebar = () => {
    setActiveSideBar(!activeSideBar);
  };

  // To hide the navbar on mobile devices drag the navbar from right to left like a swipe
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

    const sideNav = document.querySelector(".side-nav-bar");
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

  

  const handleFilterShow = () => {
    setActiveFilter(!activeFilter);
  };

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
            <div onClick={handleFilterShow} style={{ cursor: "pointer" }}>
              <Icon src={Filter} alt="Filter Icon" />
            </div>
          </SearchBarContainer>
        </HeaderContainer>
      ) : null}

      <SearchFiltersContMobile className={activeFilter ? "visible" : ""} visible={activeFilter}>
      <FaArrowAltCircleLeft onClick={handleFilterShow} style={{ cursor: "pointer" }}/>
      <ExpandableFilters
          genres={state.genreOptions}
          ratings={state.ratingOptions}
          languages={state.languageOptions.map((option) => ({ id: option.name, name: option.name }))}
          onFilterChange={(selectedFilters) => {
            console.log(selectedFilters);
          }}
        />
      </SearchFiltersContMobile>

      <SideNavBarCont className={activeSideBar ? "visible" : ""}>
        <SideNavMainLink
          className="menu_nav_link main_nav_link"
          to="/"
          activeClassName="active"
          exact
          style={{ fontWeight: "600" }}
        >
          Wesley
          <NavIcon onClick={toggleSidebar}>
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
    </>
  );
}
