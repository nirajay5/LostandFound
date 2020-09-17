const React = require("react");
const Category = require("./Category");
const ImageUpload = require("./ImageUpload");

const Form1 = function(props) {
  let errTitle = props.errTitle;
  let errCategory = props.errCategory;
  return (
    <div>
      <div class="formInputSection">
        <label>
          Title
          <span class="errorMessage" id="errTitle">
            {errTitle}
          </span>
        </label>
        <input class="smallTxtBox" type="text" id="title"  />
      </div>

      <Category err={errCategory}/>

      <div class="formInputSection">
        <label>Description</label>
        <textarea id="description" rows="5"></textarea>
      </div>
      
    <ImageUpload/>
    </div>
  );
};

// This line indicates what functions or data from this file will be included in
// other Javascript files when this file is required
module.exports = Form1;
