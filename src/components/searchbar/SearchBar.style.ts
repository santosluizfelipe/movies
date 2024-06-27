import styled from "styled-components";
import { lightBackground, lightGreen } from "../../colors";

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${lightGreen};
  border-radius: 3px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: ${lightBackground};
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  color: #fff;
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