import styled from "styled-components";
import { lightBackground, lightGreen } from "../../colors";

export const DiscoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 35px;
  background-color: ${lightBackground};
  justify-content: center;
  align-items: center;
`;

export const MobilePageTitle = styled.header`
  margin-bottom: 20px;
`;

export const SearchSection = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
`;

export const MovieFilters = styled.div`
  width: 100%; 
`;

export const MovieResults = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const MovieCard = styled.div`
  display: flex;
  padding: 20px;
  background-color: #fff;
  max-width: 100%;
  max-height: 100%;
  height: 20%;
  margin-top: 1rem;
  margin-right: 15px;

  img {
    width: 120px;
    height: 170px;
    max-height: 100%;
  }

`;

export const Header = styled.h3`
  margin: 0; 
  font-weight: 600;
`
export const GenreLabel = styled.p`
  margin: 0;
  color: ${lightGreen};
  font-weight: 600;
  font-size: 10px;
  margin-bottom: 0.5rem;
`

export const ReleaseDateLabel = styled(GenreLabel)`
  font-weight: 100;
`

export const MovieOverview = styled.p`
  margin: 0;
  font-size: 10px;
  letter-spacing: 1px;
  overflow: hidden;

  @media (max-width: 923px) {  
    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
    max-height: 50%;
  }
`;

export const MovieInfo = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;


export const ReleaseDateContainer = styled.div`
  align-self: flex-start;
`;

export const InfoContent = styled.div`
  flex-grow: 1;
`;

export const Rating = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-left: 20px;
  background-color: ${lightGreen};
  color: #fff;
  border-radius: 3px;
  padding: 3px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`