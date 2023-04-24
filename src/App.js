import "./styles/App.css";
import Input from "./components/Input";
import { useState } from "react";
import axios from "axios";
function App() {
  const [values, setValues] = useState({
    ccnumber: "",
    nameOnCard: "",
    expDate: "",
    secCode: "",
  });

  const inputs = [
    {
      id: 1,
      name: "ccnumber",
      type: "text",
      placeholder: "1234 5678 9101 1213",
      errormessage: "Should be a valid credit card number (16 numbers)",
      label: "Card Number",
      // pattern: "^[0-9]{16}$",
      required: false,
    },
    {
      id: 2,
      name: "nameOnCard",
      type: "text",
      placeholder: "Ex. John Smith",
      errormessage: "Name should be only letters between 2 and 20",
      // pattern: "^[A-Za-z ]{2,20}$",
      label: "Name on card",
      required: false,
    },
    {
      id: 3,
      name: "expDate",
      type: "text",
      placeholder: "01/25",
      // pattern: "^(0[1-9]|1[0-2])/?([0-9]{2})$",
      errormessage: "Invalid date or date older than today's",
      label: "Expiry date",
      required: false,
    },
    {
      id: 4,
      name: "secCode",
      type: "text",
      placeholder: "CVV",
      errormessage: "Security code should be three numbers",
      label: "Security Code",
      // pattern: "^[0-9]{3}$",
      required: false,
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api", values)
      .then((response) => console.log(response));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const [clickedSubmit, setClickedSubmit] = useState(false);

  const handleClick = (e) => {
    // setClickedSubmit(true);
    // e.currentTarget.style.backgroundColor = null;
    // e.currentTarget.style.textAlign = "left";
    // e.currentTarget.style.transitionDelay = 2;
    // console.log("two");
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Checkoutttt</h1>
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <button type="submit" onClick={handleClick}>
          Pay
        </button>
        <h1 id="success">Payment Successful !</h1>
      </form>
    </div>
  );
}

export default App;
