import React from "react";
import styled from 'styled-components';

import { grayFont } from "../../colors";

type CheckBoxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

export default function CheckBox({ label, checked, onChange }: CheckBoxProps) {
  return (
    <CheckboxCont>
      <Input type="checkbox" checked={checked} onChange={onChange} />
      <Label>{label}</Label>
    </CheckboxCont>
  );
}

const CheckboxCont = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

const Input = styled.input`
  margin-right: 8px;
`;

const Label = styled.label`
  cursor: pointer;
  color: ${grayFont};
`;
