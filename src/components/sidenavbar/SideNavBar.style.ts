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
    height: 100%;
  }
`;

export const SideNavMainLink = styled(Link)`
  position: relative;
  display: block;
  padding: 25px 35px;
  font-size: 1.6em;
  font-weight: 700;
  color: white;
  border-bottom: 1px solid ${colors.grayFont};
`

export const NavIcon = styled.div`
  position: absolute;
  right: 35px;
  top: 50%;
`

export const SideNavHeader = styled.div`

`

export const HeaderText = styled.div`

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
  align-items: center;
  justify-content: space-between;

  background-color: ${colors.lightBackground};
`;



