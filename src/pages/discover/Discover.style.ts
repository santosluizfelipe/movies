import styled from "styled-components";
import { lightBackground, primaryColor } from "../../colors";

export const DiscoverWrapper = styled.div`
  padding: 60px 35px;
  background-color: ${lightBackground};

`;

export const TotalCounter = styled.div`
  font-weight: 900;
`;

export const MovieResults = styled.div`
  display: flex;
  flex-direction: column;

`;

export const MovieFilters = styled.div``;

export const MobilePageTitle = styled.header``;

export const MovieCard = styled.div`
  display: flex;
  padding: 20px;
  background-color: #fff;
  width: 70%;
  height: 20%;
  margin-top: 1rem;


  img {
    width: 120px;
    height: 170px;
  }

  p {
    font-size: 11px;
  }
`;
export const MovieInfo = styled.div`
  margin-left: 15px;
`