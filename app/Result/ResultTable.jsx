const React = require("react");
const ResultItem = require("./ResultItem");
const ItemDetails = require("./ItemDetails");
const Logo = require("../logo");

const ResultTable = function(props) {

  let results = props.items;
  let formInput = props.formInput;
  
  let setCurrPage = props.setCurrPage;
  let setCurrPerson = props.setCurrPerson;
  let setFormInput = props.setFormInput;
  
  function goBack() {
    setCurrPage("Search");
  }

  console.log(results);
  console.log(formInput);

  let from_time = new Date(formInput.dateTimeFrom).toString();
  let to_time = new Date(formInput.dateTimeTo).toString();
  let from_time_month_day = from_time.split(' ').slice(1,3).join(' ');
  let to_time_month_day = to_time.split(' ').slice(1,3).join(' ');
   
  let result_title = "Showing results for";
  if (results.length == 0) {
    result_title = "No Results Found";
  }
  
  let optional_comma_loc = ", ";
  let optional_comma_key = ", ";
  if (formInput.location == null || formInput.location == "") {
    optional_comma_loc = "";
  }
  if (formInput.title == null || formInput.title == "") {
    optional_comma_key = "";
  }

  return (
    <div>
      <Logo setCurrPerson={setCurrPerson} setFormInput={setFormInput} setCurrPage={setCurrPage}/>
      <div class="result-page">
        <div class="showing-results-for">{result_title}</div>
        <div class="result-subheader">
          <div class="search-parameters">
            <span>{from_time_month_day}</span>
            <span> - </span>
            <span>{to_time_month_day}</span>
            <span>, </span>
            <span>{formInput.category}</span>
            <span>{optional_comma_loc}</span>
            <span>{formInput.location}</span>
            <span>{optional_comma_key}</span>
            <span>{formInput.title}</span>
          </div>
          <div class="edit-search-button" onClick={goBack}>
            Edit Search
          </div>
        </div>

        <div>
          {results.map(name => (
            <ResultItem singleitem={name} />
          ))}
        </div>
      </div>
    </div>
  );
};

module.exports = ResultTable;
