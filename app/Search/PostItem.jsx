const React = require("react");
const Form1 = require("./Form1");
const Form2 = require("./Form2");
const Form3 = require("./Form3");
const Button = require("./Button");
const Logo = require("../logo");
const globals = require("../globals");

let Form_Input = {
  type: "",
  title: "",
  category: "",
  description: "",
  image: "",
  dateTime: "",
  location: ""
};
function postNewItemToDB(finishPost) {
  let jsonStr = JSON.stringify(Form_Input);

  var xmlhttp = new XMLHttpRequest();
  var url = "/newItem";
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(jsonStr);

  // callback function executed when the HTTP response comes back
  xmlhttp.onloadend = function(e) {
    // Get the server's response body
    console.log("PostItem : response received");
    console.log("url id: ", xmlhttp.responseText);

    finishPost();
  };
}
const PostItem = function(props) {
  console.log("Entered PostItem.jsx");

  let text = "";
  if (props.type == "Seeker") {
    text = "Input the lost item";
  } else {
    text = "Input the found item";
  }
  Form_Input.type = props.type;

  let setCurrPage = props.setCurrPage;
  let setCurrPerson = props.setCurrPerson;
  let setFormInput = props.setFormInput;
  let setSubmitMessage = props.setSubmitMessage;

  function goSearch() {
    setCurrPage("Search");
  }
  function finishPost() {
    setSubmitMessage("Thank you for your submission!");
    setCurrPage("Home");
  }
  //State variable
  const [form, setCurrForm] = React.useState("Form1");

  const [errTitle, setErrTitle] = React.useState("");
  const [errCategory, setErrCategory] = React.useState("");
  const [errLocation, setErrLocation] = React.useState("");
  const [errDate, setErrDate] = React.useState("");

  function updateForm(newForm) {
    if (form == "Form1") {
      //Save Form1 Data as JSON
      let title = document.getElementById("title").value;
      let category = document.getElementById("category").value;
      let description = document.getElementById("description").value;
      let image = document.getElementById("imgFileName").textContent;

      //Error Check
      if (title == "") {
        setErrTitle("* Missing Title");
        return;
      }
      setErrTitle("");
      if (category == "") {
        setErrCategory("* Missing Category");
        return;
      } else if (!globals.isValidCategory(category)) {
        setErrCategory("* Invalid Category");
        return;
      }
      setErrCategory("");

      //Update Form JSON
      Form_Input.title = title;
      Form_Input.category = category;
      Form_Input.description = description;
      Form_Input.image = image;

      //Transition to next form
      setCurrForm("Form2");
    }
    if (form == "Form2") {
      let date = document.getElementById("date").value;
      let time = document.getElementById("time").value;
      let location = document.getElementById("location").value;

      if (date == "") {
        setErrDate("* Missing Date");
        return;
      }
      if (time == "") {
        //Init to start of day
        time = "00:00";
      }
      //Update Form JSON
      let dateTime = new Date(date + "T" + time);
      let today = new Date();

      if (dateTime > today) {
        setErrDate("* Date cannot be in the future");
        return;
      }
      setErrDate("");

      if (location != "" && !globals.isValidLocation(location)) {
        console.log("invalid!");
        setErrLocation("* Invalid Location");
        return;
      }
      setErrLocation("");

      //Update Form JSON
      Form_Input.dateTime = dateTime.toISOString();
      Form_Input.location = location;
      console.log(Form_Input);

      //Post to database
      postNewItemToDB(finishPost);
    }
  }
  console.log("Current form: " + form);
  let contents = <Form1 errTitle={errTitle} errCategory={errCategory} />;
  if (form == "Form2") {
    contents = <Form2 errDate={errDate} errLocation={errLocation} />;
  }

  return (
    <main>
      <Logo
        setCurrPerson={setCurrPerson}
        setFormInput={setFormInput}
        setCurrPage={setCurrPage}
      />
        <h3>{text}</h3>
        <div class="form">
          {contents}
          <Button displayForm={form} onClick={updateForm} />
        </div>
        <h3>Or search for existing items</h3>
        <div class="searchExisting">
          <div class="searchBox" onClick={goSearch}></div>
          <img
            class="searchIcon"
            src="https://cdn.glitch.com/31229923-dd8e-4bcf-a2c7-f449bc95760b%2Fsearch-solid.svg?v=1590468419851"
          />
        </div>
    </main>
  );
};

module.exports = PostItem;
