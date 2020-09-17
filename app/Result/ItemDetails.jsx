const React = require("react");

const ItemDetails = function(props) {
  let time = new Date(props.details.dateTime).toString();
  
  let clock = time.split(' ').slice(4,5);
  let month_day = time.split(' ').slice(1,3).join(' ');
  let formatted_time = month_day + ' ' + clock;
  
  let location = "Location";
  if (props.details.location == null || props.details.location == "") {
    location = "";
  }
  
  return (
    <div class="item-details">
      <div class="text-details">
        <div class="item-attributes">
          <div class="category">
            <div>Category</div>
            <div>{location}</div>
            <div>Date</div>
          </div>
          <div class="category-responses">
            <div>{props.details.title}</div>
            <div>{props.details.location}</div>
            <div>{formatted_time}</div>
          </div>
        </div>
        <div class="description">{props.details.description}</div>
      </div>
    </div>
  );
};

module.exports = ItemDetails;
