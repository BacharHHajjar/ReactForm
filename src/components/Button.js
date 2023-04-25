import { ReactComponent as Loader } from "../icons/loader.svg";
import "../styles/button.css";
const Button = (props) => {
  return (
    <button
      className="submit-btn"
      onSubmit={props.onSubmit}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {!props.loading ? props.text : <Loader className="spinner" />}
    </button>
  );
};

export default Button;
