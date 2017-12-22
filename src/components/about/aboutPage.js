"use strict";

var React = require('react');

var About = React.createClass({
  render: function(){
    return (
      <div>
        <h1>About</h1>
        <p>
          This app has following Books:
          <ul>
            <li>React</li>
            <li>Router</li>
            <li>Flux</li>
            <li>Gulp</li>
          </ul>
        </p>
      </div>
    )
  }
});

module.exports = About;
