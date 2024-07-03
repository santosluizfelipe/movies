import styled from "styled-components";
import { lightBackground, lightGreen } from "../../colors";

export const DiscoverWrapper = styled.div<{isSideBarActive?: boolean}>`
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
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 769px) {
    justify-content: flex-start;
  }
`;

export const MovieCard = styled.div`
  display: flex;
  padding: 20px;
  background-color: #fff;
  max-width: 100%;
  max-height: 200px;
  height: auto;
  margin-top: 1rem;
  margin-right: 15px;
  overflow: hidden;

  img {
    width: 120px;
    height: 170px;
    max-height: 100%;
  }

  @media (max-width: 768px) {  
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    width: 100%;
    padding: 0px;
  }

  @media (max-width: 430px) {  
    width: 370px;
    margin-right: 0rem;
  }
`;

export const Header = styled.h3`
  margin: 0; 
  font-weight: 600;
`;

export const GenreLabel = styled.p`
  margin: 0;
  color: ${lightGreen};
  font-weight: 600;
  font-size: 10px;
  margin-bottom: 0.5rem;
`;

export const ReleaseDateLabel = styled(GenreLabel)`
  font-weight: 100;
`;

export const MovieOverview = styled.p`
  margin: 0;
  font-size: 10px;
  letter-spacing: 1px;
  overflow: hidden;

  @media (max-width: 923px) {  
    mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
    max-height: 50%;
  }

  @media (max-width: 768px) {  
    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
    max-height: 50px;
  }

  @media (max-width: 430px) {  
    max-height: 40px;
  }
`;

export const MovieInfo = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 768px) {
    margin-left: 0;
    align-items: center;
  }
`;

export const ReleaseDateContainer = styled.div`
  align-self: flex-start;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    align-self: flex-start;
    margin-top: 0.5rem;
  }
`;

export const InfoContent = styled.div`
  flex-grow: 1;
  max-height: 70%;
  margin-left: 0.5rem;
`;

export const Rating = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-left: 20px;
  background-color: ${lightGreen};
  color: #fff;
  border-radius: 3px;
  padding: 3px;
  max-height: 1.275rem;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 5px;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

    @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 0px;
  }
`;
