const React = require("react");
const Logo = require("../logo");
const Home = require("./Home");

console.log("App is starting");

const Login = function(props) {
  let errormessage = "";
  testQuery();

  function testQuery() {
    let q = window.location.search;
    console.log(q);
    if (q == "?email=notUCD") {
      console.log("Not a UCD email");
      errormessage = "Log in with your UC Davis email account";
    } else {
      errormessage = "";
    }
  }

  return (
    <div class="login-container">
      <div>
        <img
          class="img"
          src="https://cdn.glitch.com/227cc4a0-efad-4921-8bf9-2bd88c6c968b%2FShields.jpg?v=1590616216406"
        />
      </div>
      <div class="right">
        <h4>{errormessage}</h4>
        <div>
          <img
            src="https://cdn.glitch.com/227cc4a0-efad-4921-8bf9-2bd88c6c968b%2FLogo.png?v=1590616159559"
            width="200"
          />
        </div>
        <div>
          <a href="auth/google">
            <button class="button login-button">
              <img
                src="https://cdn.glitch.com/227cc4a0-efad-4921-8bf9-2bd88c6c968b%2FGoogle.jpg?v=1590616211178"
                width="45"
              />
              Login with Google
            </button>
          </a>
        </div>
      </div>
    </div>
  );
  
}


module.exports = Login;
