const React = require("react");
const ItemDetails = require("./ItemDetails");
const ItemDetailsImage = require("./ItemDetailsImage");
const ToggleBox = require("./ToggleBox");

const ResultItem = function(props) {
  let itemdet;
  if (props.singleitem.image == null || props.singleitem.image == "") {
    itemdet = <ItemDetails details={props.singleitem} />;
  } else {
    itemdet = <ItemDetailsImage moredetails={props.singleitem} />;
  }

  return (
    <div class="result-item">
      <div class="result-title">{props.singleitem.title}</div>
      <ToggleBox title="More">{itemdet}</ToggleBox>
    </div>
  );
};

module.exports = ResultItem;
