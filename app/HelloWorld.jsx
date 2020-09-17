const React = require("react");
const Search = require("./Search/Search");
const PostItem = require("./Search/PostItem");
const Login = require("./Home/Login");
const Home = require("./Home/Home");
const ResultTable = require("./Result/ResultTable");

function appendCSS(pathname) {
  // pathname relative to index.html
  let head = document.head;
  let link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = pathname;
  head.appendChild(link);
}
const pages = {
  Home: "Home",
  Login: "Login",
  Option: "Option",
  Search: "Search",
  Results: "Results",
  PostItem: "PostItem"
};
const persons = {
  Seeker: "Seeker", // You lost an item
  Finder: "Finder" // You found an item
};

/* the main page for the index route of this app */
const HelloWorld = function() {
  let allCookies = document.cookie;
  
  let initPage = pages.Login;
  if (allCookies != []) {
    initPage = pages.Home;
  }
  console.log(allCookies);
  // STATE VARIABLES
  const [page, setCurrPage] = React.useState(initPage);
  const [person, setCurrPerson] = React.useState("");
  const [searchResults, updateResults] = React.useState({});
  const [formInput, setFormInput] = React.useState({});
  const [SubmissionMessage, setSubmitMessage] = React.useState("");

  let content = "";
  if (page == pages.Results) {
    //appendCSS("results.css");

    content = (
      <Login
        items={searchResults}
        formInput={formInput}
        setCurrPage={setCurrPage}
        setCurrPerson={setCurrPerson}
        setFormInput={setFormInput}
      />
    );
  }
  if (page == pages.Results) {
    //appendCSS("results.css");
    if (person == persons.Finder) {
      appendCSS("resultsFind.css"); //go to blue
    } else {
      //Seeker
      appendCSS("resultsSeek.css"); //go to yellow
    }
    content = (
      <ResultTable
        items={searchResults}
        formInput={formInput}
        setCurrPage={setCurrPage}
        setCurrPerson={setCurrPerson}
        setFormInput={setFormInput}
      />
    );
  } else if (page == pages.Search) {
    appendCSS("search.css");
    if (person == persons.Finder) {
      appendCSS("searchFind.css");
    } else {
      appendCSS("searchSeek.css");
    }
    content = (
      <Search
        type={person}
        formInput={formInput}
        setCurrPage={setCurrPage}
        setCurrPerson={setCurrPerson}
        setFormInput={setFormInput}
        updateResults={updateResults}
      />
    );
  } else if (page == pages.PostItem) {
    appendCSS("search.css");
    if (person == persons.Finder) {
      appendCSS("searchFind.css");
    } else {
      appendCSS("searchSeek.css");
    }
    content = (
      <PostItem
        type={person}
        setCurrPage={setCurrPage}
        setCurrPerson={setCurrPerson}
        setFormInput={setFormInput}
        setSubmitMessage={setSubmitMessage}
      />
    );
  } else if (page == pages.Login) {
    appendCSS("login.css");
    content = <Login />;
  } else if (page == pages.Home) {
    appendCSS("home.css");
    content = (
      <Home
        setCurrPage={setCurrPage}
        setCurrPerson={setCurrPerson}
        setFormInput={setFormInput}
        message={SubmissionMessage}
      />
    );
  }
  return <main>{content}</main>;
};

module.exports = HelloWorld;
