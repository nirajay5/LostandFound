const React = require("react");

const ItemDetailsImage = function(props) {

  let imgsrc = "http://ecs162.org:3000/images/ochib/" + props.moredetails.image;
  
  let time = new Date(props.moredetails.dateTime).toString();
  let clock = time.split(' ').slice(4,5);
  let month_day = time.split(' ').slice(1,3).join(' ');
  let formatted_time = month_day + ' ' + clock;
  
  let location = "Location";
  if (props.moredetails.location == null || props.moredetails.location == "") {
    location = "";
  }

  return (
    <div class="item-details">
      <div class="image-wrapper">
        <img src={imgsrc} />
      </div>
      <div class="text-details">
        <div class="item-attributes">
          <div class="category">
            <div>Category</div>
            <div>{location}</div>
            <div>Date</div>
          </div>
          <div class="category-responses">
            <div>{props.moredetails.title}</div>
            <div>{props.moredetails.location}</div>
            <div>{formatted_time}</div>
          </div>
        </div>
        <div class="description">{props.moredetails.description}</div>
      </div>
    </div>
  );
};

module.exports = ItemDetailsImage;
