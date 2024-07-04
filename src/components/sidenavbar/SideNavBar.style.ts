import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

import * as colors from "../../colors";


export const SideNavBarCont = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: ${colors.sideNavBar};
  z-index: 20;
  transform: translateX(-100%);
  transition: transform 0.3s ease;

  &.visible {
    transform: translateX(0);
  }

  @media (min-width: 769px) {
    transform: translateX(0);
  }
`;

export const SideNavMainLink = styled(Link)`
  position: relative;
  display: block;
  font-size: 1.6em;
  font-weight: 300;
  color: white;
  padding: 20px 0 20px 20px;


  &:hover {
    background-color: ${colors.lightGreen};
  }
`

export const NavIcon = styled.div`
  display: flex;
  position: absolute;
  right: 35px;
  top: 40%;

`

export const SideNavHeader = styled.div`
  padding: 20px 20px 20px 0;
  color: white;
  border-bottom: 1px solid ${colors.grayFont};
  margin-left: 20px;
`

export const HeaderText = styled.div`
  font-size: 24px;
  font-weight: 300;

`

export const NavLink = styled(Link)`
  display: block;
`

export const HamburgerIcon = styled.div`
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 10;
  font-size: 1.5em;
  color: black;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 1rem;
  }
`;

export  const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;


  @media (max-width: 430px) {
    width: 100%;
  }

  @media (max-width: 765px) {
    width: 100%;
  }
`;


export const NavLinkContainer = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
`;




export const StyledNavLink = styled(NavLink)`
  color: ${colors.fontColor};
  text-decoration: none;
  font-weight: 100;

  &.active {
    color: ${colors.fontColor}; 
  }
`;


export const SearchFiltersContMobile = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 1rem;
  right: 0;
  height: 100%;
  height: 100%;
  width: ${(props) => (props.visible ? "250px" : "0px")};
  background-color: ${colors.lightBackground};
  z-index: 20;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: auto;

  &.visible {
    transform: translateX(0);
  }

  @media (min-width: 769px) {
    transform: translateX(0);
  }
`;



