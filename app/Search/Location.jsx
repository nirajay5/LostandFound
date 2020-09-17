const React = require("react");
const globals = require("../globals");

const Options = function() {
  return (
    <datalist id="locations">
      {globals.getLocations().map(function(item) {
        return <option value={item} />;
      })}
    </datalist>
  );
};

const Location = function(props) {
  let err = props.err;
  return (
    <div class="formInputSection">
      <label>
        Location
        <span class="errorMessage" id="errLocation">
          {err}
        </span>
      </label>
      <input
        class="smallTxtBox"
        type="search"
        list="locations"
        id="location"
        autocomplete="on"
        defaultValue={props.location}
        onchange={function(e) {
          this.setState({ value: e.target.value });
        }}
      />
      <Options />
    </div>
  );
};
module.exports = Location;
