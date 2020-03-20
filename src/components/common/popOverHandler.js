import ReactDOM from "react-dom";

function PopOverHandler(props) {
  return ReactDOM.createPortal(props.children, document.querySelector("#popOver"));
}

export default PopOverHandler;
