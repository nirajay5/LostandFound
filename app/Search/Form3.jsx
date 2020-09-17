const React = require("react");
const Category = require("./Category");
const Location = require("./Location");

const Form3 = function(props) {
  let errDate = props.errDate;
  let errCategory = props.errCategory;
  let errLocation = props.errLocation;
  let Form_Input = props.formInput;

  let category = Form_Input.category;
  let location = Form_Input.location;
  let dateFrom = Form_Input.dateFrom;
  let dateTo = Form_Input.dateTo;
  let timeFrom = Form_Input.timeFrom;
  let timeTo = Form_Input.timeTo;

  return (
    <div>
      <div class="formInputSection">
        <label>
          Date & Time
          <span class="errorMessage" id="errDateTime_SearchItem">
            {errDate}
          </span>
        </label>

        <div class="dateTimeRange">
          <div class="from">
            <input
              class="dateTxtBox_search"
              type="date"
              id="date_search_from"
              defaultValue={dateFrom}
              onchange={function(e) {
                this.setState({ value: e.target.value });
              }}
            />
            <input
              class="timeTxtBox_search"
              type="time"
              id="time_search_from"
              defaultValue={timeFrom}
              onchange={function(e) {
                this.setState({ value: e.target.value });
              }}
            />
          </div>
          <div class="rangeText">to</div>
          <div class="to">
            <input
              class="dateTxtBox_search"
              type="date"
              id="date_search_to"
              defaultValue={dateTo}
              onchange={function(e) {
                this.setState({ value: e.target.value });
              }}
            />
            <input
              class="timeTxtBox_search"
              type="time"
              id="time_search_to"
              defaultValue={timeTo}
              onchange={function(e) {
                this.setState({ value: e.target.value });
              }}
            />
          </div>
        </div>
      </div>

      <Category err={errCategory} category={category} />
      <Location err={errLocation} location={location} />
    </div>
  );
};

// This line indicates what functions or data from this file will be included in
// other Javascript files when this file is required
module.exports = Form3;
