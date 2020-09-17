const React = require("react");
const globals = require("../globals");

const Options = function() {
  return (
    <datalist id="categories">
      {globals.getCategories().map(function(item) {
        return <option value={item} />;
      })}
    </datalist>
  );
};

const Category = function(props) {
  let err = props.err;
  return (
    <div class="formInputSection">
      <label>
        Category
        <span class="errorMessage" id="errCategory" autocomplete="on">
          {err}
        </span>
      </label>
      <input
        type="search"
        class="smallTxtBox"
        list="categories"
        id="category"
        defaultValue={props.category}
        onchange={function(e) {
          this.setState({ value: e.target.value });
        }}
      />
      <Options />
    </div>
  );
};
module.exports = Category;
