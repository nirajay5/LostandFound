const React = require("react");

const Button = function(props) {
  let contents = (
    <div class="nextFormBtn" onClick={props.onClick}>
      Next
    </div>
  );
  if (props.displayForm == "Form2") {
    contents = (
      <div class="submitFormBtn" onClick={props.onClick}>
        Submit
      </div>
    );
  } else if (props.displayForm == "Form3") {
    contents = (
      <div class="submitFormBtn" onClick={props.onClick}>
        Search
      </div>
    );
  }
  return <div class="search-form-btn">{contents}</div>;
};
module.exports = Button;
