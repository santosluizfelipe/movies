import styled from "styled-components";
import { lightBackground, lightGreen } from "../../colors";

interface SearchInputWrapperProps {
  bgColor?: string;
}

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SearchInputWrapper = styled.div<SearchInputWrapperProps>`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${lightGreen};
  margin-bottom: 0px;
  margin: 10px;
  margin-top: 15px;
  background-color: ${props => props.bgColor || '#fff'};
  padding-bottom: 0.5rem;
`;


export const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  color: ${lightGreen};
  font-weight: 600;

  &::placeholder {
    color: ${lightGreen};
    font-weight: 100;
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const SearchButton = styled.button`
  background-color: ${lightGreen};
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
`;