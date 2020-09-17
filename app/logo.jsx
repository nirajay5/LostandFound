const React = require("react");

/* returns UC DAVIS L&F logo */
const Logo = function(props) {
  function goHome() {
    props.setCurrPerson("");
    props.setFormInput({});
    props.setCurrPage("Home");
  }
  return (
    <div id="logo">
      <img
        src="https://cdn.glitch.com/31229923-dd8e-4bcf-a2c7-f449bc95760b%2FLogo.png?v=1590468419739"
        onClick={goHome}
      />
    </div>
  );
};

module.exports = Logo;
