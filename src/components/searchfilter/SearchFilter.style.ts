import styled  from "styled-components";


export const FiltersWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background-color: white;
  margin-top: 1rem;
`;

export const SearchFiltersCont = styled.div<{ marginBottom?: boolean }>`
  background-color: white;
  width: 100%;
  margin-top: 15px;
`;



export const CategoryTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
