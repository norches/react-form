import React, { useState } from "react";
import styled from "styled-components";
import Input from "../components/input/Input";
const msg = require("../messages/ru.json");

const StyledForm = styled.form``;
const StyledButton = styled.button`
  padding: 15px;
  margin: 15px;
`;
const NotificationContainer = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  font-size: 23px;
  font-weight: bold;
  color: red;
`;

const selectCountryOptiions = [
  { value: "ru", label: msg.russia },
  { value: "us", label: msg.usa },
];

const selectSexOptions = [
  { value: "male", label: msg.male },
  { value: "female", label: msg.female },
  { value: "other", label: msg.otherGender },
];

const fields = [
  { name: "fullname", type: "text", label: msg.fullname },
  { name: "phone", type: "text", label: msg.phone },
  { name: "sex", type: "select", label: msg.sex, options: selectSexOptions },
  {
    name: "country",
    type: "select",
    label: msg.country,
    options: selectCountryOptiions,
  },
  { name: "email", type: "email", label: msg.email },
  { name: "address", type: "text", label: msg.address },
  { name: "about", type: "textarea", label: msg.about },
  { name: "degree", type: "text", label: msg.degree },
  { name: "company", type: "text", label: msg.company },
];
/* [
  ({ id: 10, color: "red" },
  { id: 20, color: "blue" },
  { id: 30, color: "green" })
].reduce((acc, cur) => ({ ...acc, [cur.color]: cur.id }), {});
*/

const Form = () => {
  const initialFormData = fields.reduce(
    (o, key) => Object.assign(o, { [key.name]: "" }),
    {}
  );
  // eslint-disable-next-line
  let inputRefs = [];
  const [formData, setFormData] = useState(initialFormData);
  const [notification, setNotication] = useState({
    show: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, val) => {
    setFormData({ ...formData, [field]: val });
  };

  const showNotification = (message) => {
    setNotication({ show: true, message: message });
    setTimeout(() => {
      setNotication({ show: false, message: "" });
    }, 2000);
  };

  const handleSend = async (e) => {
    //make httpRequest
    e.preventDefault();
    setLoading(true);
    const request = new Promise((resolve, reject) => {
      console.log("requestBody:", formData);
      setTimeout(() => resolve("{json respone}"), 2000);
    });
    const result = await request;
    showNotification(result);
    setLoading(false);
  };

  const setRef = (fieldIndex, el) => {
    inputRefs[fieldIndex] = el;
  };

  const handleKeyPress = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.type !== "textarea") {
      if (e.key === "ArrowUp") {
        if (index - 1 >= 0) {
          inputRefs[index - 1].focus();
        }
      } else if (e.key === "ArrowDown" || e.key === "Enter") {
        if (index + 1 <= inputRefs.length - 1) {
          inputRefs[index + 1].focus();
        }
      }
    }
  };
  return (
    <StyledForm>
      <h2>{msg.fillForm}</h2>
      {fields.map((fieldProps, index) => (
        <div
          key={`field-${fieldProps.name}`}
          onKeyUp={(e) => handleKeyPress(index, e)}
        >
          <Input
            {...fieldProps}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={formData[fieldProps.name]}
            refCallback={(el) => setRef(index, el)}
          />
        </div>
      ))}
      <StyledButton type="button" onClick={(e) => handleSend(e)}>
        {msg.send}
      </StyledButton>
      <code>{JSON.stringify(formData)}</code>
      {loading && <div>{msg.loading}</div>}
      <NotificationContainer show={notification.show}>
        {msg.serverResponse}: {notification.message}
      </NotificationContainer>
    </StyledForm>
  );
};

export default Form;
