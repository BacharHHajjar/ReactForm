import { useState } from "react";
import "../styles/input.css";
export default function Input(props) {
  const { label, onChange, errormessage, id, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleBlur = (e) => {
    setFocused(true);
  };

  return (
    <div className="input">
      <label>{label}</label>
      <input
        id={id}
        {...inputProps}
        onChange={onChange}
        onBlur={handleBlur}
        focused={focused.toString()}
      />
      <span>{errormessage}</span>
    </div>
  );
}
