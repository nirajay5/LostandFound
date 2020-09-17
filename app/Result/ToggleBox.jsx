//import React, { Component } from "react";
const React = require("react");

class ToggleBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.toggleBox = this.toggleBox.bind(this);
  }

  toggleBox() {
    const { opened } = this.state;
    this.setState({
      opened: !opened
    });
  }

  render() {
    var { title, children } = this.props;
    const { opened } = this.state;

    if (opened) {
      title = "Less";
    } else {
      title = "More";
    }

    return (
      <div className="box">
        {opened && <div class="boxContent">{children}</div>}
        <div className="boxTitle" onClick={this.toggleBox}>
          {title}
        </div>
      </div>
    );
  }
}

module.exports = ToggleBox;