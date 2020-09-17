const React = require("react");
const Logo = require("../logo");

const Search = function(props) {
  let setCurrPerson = props.setCurrPerson;
  let setCurrPage = props.setCurrPage;
  let setFormInput = props.setFormInput;
  let message = props.message;
  
  
  function postSeeker(){
    setCurrPerson("Seeker");
    setCurrPage("PostItem");
  }
    function postFinder(){
    setCurrPerson("Finder");
    setCurrPage("PostItem");
  }
  
  return (
    <main>
      <Logo setCurrPerson={setCurrPerson} setFormInput={setFormInput} setCurrPage={setCurrPage}/>
      <h4>{message}</h4>
      <div class="finderseeker-container">
        <div>
          <h3>Did you find something?</h3>
          <div>
            <button class="button button-yellow" onClick={postFinder}>I'm a finder</button>
          </div>
        </div>
        <div>
          <h3>Are you looking for something?</h3>
          <div>
            <button class="button button-blue" onClick={postSeeker}>I'm a seeker</button>
          </div>
        </div>
      </div>
    </main>
  );
  

  
};

module.exports = Search;