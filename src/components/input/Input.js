import React from "react";
import styled from "styled-components";
import StyledFlexWrapper from "../shared/StyledFlexWrapper";
import guid from "../../utils/guid";
const msg = require("../../messages/ru.json");

const StyledLabel = styled.label`
  padding: 0.5em;
`;

const StyledInput = styled.input``;
const StyledTextarea = styled.textarea``;
const StyledSelect = styled.select``;

const Input = (props) => {
  const commonProps = {
    name: props.name,
    type: props.type,
    value: props.value,
    onChange: props.onChange,
  };
  return (
    <StyledFlexWrapper>
      {props.label && (
        <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      )}
      {props.type === "textarea" ? (
        <StyledTextarea {...commonProps} />
      ) : props.type === "select" ? (
        <StyledSelect {...commonProps}>
          <option value={""}>{msg.selectOption}</option>
          {props.options.map((option) => {
            return (
              <option key={`option-${guid()}`} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </StyledSelect>
      ) : (
        <StyledInput {...commonProps} />
      )}
    </StyledFlexWrapper>
  );
};

export default Input;
