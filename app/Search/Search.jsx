const React = require("react");
const Form1 = require("./Form1");
const Form2 = require("./Form2");
const Form3 = require("./Form3");
const Button = require("./Button");
const Logo = require("../logo");
const globals = require("../globals");

/* Container list for all filtered search results from database
 * Contains 'type' (if we are seeker, result is from the Finder, vice versa)
 * Contains 'dateTime' Found/lost
 * Contains 'category'
 * Contains 'title'
 * May Contain 'description', if blank = ""
 * May Contain 'location', if blank = ""
 * May Contain 'image', if blank = ""
 */
let rows = [];

// Contains information parsed from <input> tags
let Form_Input = {
  type: "",
  title: "",
  dateTimeFrom: "",
  dateTimeTo: "",
  category: "",
  location: ""
};

function filterRows(list) {
  // Form List of JSON based on rest of params (date range, keyword)
  rows = [];
  var i;

  console.log("potato".includes("to")); //TEST
  for (i = 0; i < list.length; i++) {
    var isMatch_Title = true;
    var isMatch_Description = true;
    var isMatch_Date = true;

    //Keyword match : title+description
    if (Form_Input.title != "" && list[i].title != "") {
      if (
        !list[i].title.toLowerCase().includes(Form_Input.title.toLowerCase())
      ) {
        isMatch_Title = false;
        
      }
    }
    if (Form_Input.title != "" && list[i].description != "") {
      if (
        !list[i].description
          .toLowerCase()
          .includes(Form_Input.title.toLowerCase())
      ) {
        isMatch_Description = false;
      }
    }
    if(isMatch_Title ==  false && list[i].description == ""){
      // evades glitch when description is empty but title is does not match
      isMatch_Description = false;
    }
    //Date Range Match
    var thisDate = new Date(list[i].dateTime);
    if (
      thisDate > Form_Input.dateTimeTo ||
      thisDate < Form_Input.dateTimeFrom
    ) {
      isMatch_Date = false;
    }
    if (isMatch_Date && (isMatch_Title || isMatch_Description)) {
      rows.push(list[i]);
    }
  }
  
  console.log(rows);
}
function searchTable(goResults) {
  let url = "/getSearchResults";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  console.log("Req body:");
  console.log(Form_Input);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(Form_Input));

  xhr.onloadend = function(e) {
    // Get the server's response body
    let responseStr = xhr.responseText;
    console.log("Get Search Results - response received: " + responseStr);
    filterRows(JSON.parse(responseStr));
    //Transition page
    goResults();
  };
}
const Search = function(props) {
  console.log("Entered Search.jsx");
  console.log(props.formInput);
  Form_Input = props.formInput;
  let title = Form_Input.title;

  let text = "";
  if (props.type == "Seeker") {
    text = "Search for existing items";
    Form_Input.type = "Finder"; // Used to match a seeker to a found item by finder
  } else {
    text = "Search for existing requests";
    Form_Input.type = "Seeker"; // Used to match a finder to an item lost by seeker
  }
  let setCurrPage = props.setCurrPage;
  let setCurrPerson = props.setCurrPerson;
  let setFormInput = props.setFormInput;
  let updateResults = props.updateResults;
  function goResults() {
    setFormInput(Form_Input);
    updateResults(rows);
    setCurrPage("Results");
  }

  //STATE VARIABLES
  const [errTitle, setErrTitle] = React.useState("");
  const [errCategory, setErrCategory] = React.useState("");
  const [errLocation, setErrLocation] = React.useState("");
  const [errDate, setErrDate] = React.useState("");

  function submitForm() {
    let title = document.getElementById("title_search").value;
    let dateFrom = document.getElementById("date_search_from").value;
    let dateTo = document.getElementById("date_search_to").value;
    let timeFrom = document.getElementById("time_search_from").value;
    let timeTo = document.getElementById("time_search_to").value;
    let category = document.getElementById("category").value;
    let location = document.getElementById("location").value;

    if (dateFrom == "") {
      setErrDate("* Missing date (from)");
      return;
    }
    if (timeFrom == "") {
      //Init to start of day (of dayFrom)
      timeFrom = "00:00";
      document.getElementById("time_search_from").value = timeFrom;
      console.log("Auto fill Time From: " + timeFrom);
    }
    //Init and convert dateTime to UTC
    if (dateTo == "") {
      // init to current date/time
      dateTo = new Date().toISOString().substring(0, 10);
      document.getElementById("date_search_to").value = dateTo;
      console.log("Auto fill Date To: " + dateTo);
    }
    if (timeTo == "") {
      //Init to end of day (of dayTo)
      timeTo = "23:59";
      document.getElementById("time_search_to").value = timeTo;
      console.log("Auto fill Time To: " + timeTo);
    }

    let dateFromParsed = new Date(dateFrom + "T" + timeFrom);
    let dateToParsed = new Date(dateTo + "T" + timeTo);

    //Perform Date Safety Check
    if (dateFromParsed >= dateToParsed) {
      setErrDate("* Invalid Date Time Range");
      return;
    }
    setErrDate("");

    if (category == "") {
      setErrCategory("* Missing Category");
      return;
    }
    setErrCategory("");

    if (!globals.isValidCategory(category)) {
      setErrCategory("* Invalid Category");
      return;
    }
    if (location != "" && !globals.isValidLocation(location)) {
      setErrLocation("* Invalid Location");
      return;
    }
    setErrLocation("");

    //Form JSON Request Body
    Form_Input.title = title;
    Form_Input.category = category;
    Form_Input.dateTimeFrom = dateFromParsed;
    Form_Input.dateTimeTo = dateToParsed;
    Form_Input.location = location;
    // This part is for editing search-results:
    Form_Input.dateFrom = dateFrom;
    Form_Input.timeFrom = timeFrom;
    Form_Input.dateTo = dateTo;
    Form_Input.timeTo = timeTo;

    console.log("Completed Form Input:");
    console.log(Form_Input);

    // Get Request Based on
    // Category + seeker->finder or finder->seeker type + location(if provided)
    searchTable(goResults);
  }

  return (
    <main>
      <Logo
        setCurrPerson={setCurrPerson}
        setFormInput={setFormInput}
        setCurrPage={setCurrPage}
      />

      <h3>{text}</h3>
      <div class="searchExisting">
        <input
          type="text"
          class="searchBox"
          id="title_search"
          placeholder="type keyword here..."
          defaultValue={title}
          onchange={function(e) {
            this.setState({ value: e.target.value });
          }}
        ></input>
        <img
          class="searchIcon"
          src="https://cdn.glitch.com/31229923-dd8e-4bcf-a2c7-f449bc95760b%2Fsearch-solid.svg?v=1590468419851"
        />
      </div>
      <div class="form">
        <Form3
          errDate={errDate}
          errCategory={errCategory}
          errLocation={errLocation}
          formInput={Form_Input}
        />
        <Button displayForm={"Form3"} onClick={submitForm} />
      </div>
    </main>
  );
};

module.exports = Search;
