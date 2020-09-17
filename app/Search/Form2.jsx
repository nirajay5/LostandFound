const React = require("react");
const Location = require("./Location");

const Form2 = function(props) {
  let errDate = props.errDate;
  let errLocation = props.errLocation;
  return (
    <div>
      <div class="formInputSection">
        <div class="labelDateTime">
          <label>Date & Time<span class="errorMessage" id="errDateTime_PostItem">{errDate}</span></label>
        </div>
        <div class="inputDateTime">
          <input class="dateTxtBox" type="date" id="date" />
          <input class="timeTxtBox" type="time" id="time" />
        </div>
      </div>
    <Location err={errLocation}/>
    </div>
  );
};

// This line indicates what functions or data from this file will be included in
// other Javascript files when this file is required
module.exports = Form2;
