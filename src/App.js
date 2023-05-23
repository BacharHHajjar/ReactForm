import "./styles/App.css";
import Input from "./components/Input";
import { useState } from "react";
import axios from "axios";
import { AlertBanner } from "@thumbtack/thumbprint-react";
import Button from "./components/Button";
import GifModal from "./components/GifModal";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailedMessage, setShowFailedMessage] = useState(false);
  const [showThankYouMessage, setshowThankYouMessage] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState("");
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [values, setValues] = useState({
    ccnumber: "",
    nameOnCard: "",
    expDate: "",
    secCode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    setShowSuccessMessage(false);
    setShowFailedMessage(false);

    axios
      .post("http://localhost:5000/api", values)
      .then((response) => {
        if (response.data.status) {
          setTimeout(() => setShowLoader(false), 1000);
          setTimeout(() => setShowSuccessMessage(true), 1000);
          setTimeout(() => setshowThankYouMessage(true), 1000);

          setTimeout(() => setThankYouMessage(response.data.body), 1000);
          console.log("Received data from server: " + response.data.status);
        }
      })
      .catch(() => {
        setShowLoader(false);
        setShowFailedMessage(true);
      });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AlertBanner theme="caution">
        This is a site for demonstration purposes<br></br> DO NOT ENTER REAL
        CREDIT CARD DATA!
      </AlertBanner>
      <div className="app">
        <form onSubmit={handleSubmit}>
          <h1>Checkout</h1>

          <Input
            name="ccnumber"
            key="1"
            onChange={onChange}
            placeholder="1234 5678 9101 1213"
            errormessage="Should be a valid credit card number (16 numbers)"
            label="Card Number"
            pattern="^[0-9]{16}$"
            required={false}
          />

          <Input
            name="nameOnCard"
            key="2"
            onChange={onChange}
            placeholder="Ex. John Smith"
            errormessage="Name should be only letters between 2 and 20"
            label="Name on card"
            pattern="^[A-Za-z ]{2,20}$"
            required={false}
          />

          <Input
            name="expDate"
            key="3"
            onChange={onChange}
            placeholder="01/25"
            errormessage="Invalid date or date older than today's"
            label="Expiry date"
            pattern="^(0[1-9]|1[0-2])/?([0-9]{2})$"
            required={false}
          />

          <Input
            name="secCode"
            key="4"
            onChange={onChange}
            placeholder="CVV"
            errormessage="Security code should be three numbers"
            label="Security Code"
            pattern="^[0-9]{3}$"
            required={false}
          />

          <Button
            loading={showLoader}
            text="Pay"
            type="submit"
            onClick={handleSubmit}
            disabled={showLoader}
          />
          <h1
            className="successMessage"
            style={{ display: ` ${showSuccessMessage ? "block" : "none"}` }}
          >
            Payment Successful !
          </h1>
          <h1
            className="failMessage"
            style={{ display: ` ${showFailedMessage ? "block" : "none"}` }}
          >
            Payment Failed :/
          </h1>
          <div
            dangerouslySetInnerHTML={{
              __html: ` Thank you ${thankYouMessage} for your trust!`,
            }}
            style={{ display: ` ${showThankYouMessage ? "block" : "none"}` }}
          />
        </form>
      </div>
      <div>
        <button onClick={openModal}>Give Feedback</button>
        <GifModal isOpen={modalIsOpen} closeModal={closeModal} />
      </div>
    </>
  );
}

export default App;
