"use strict";

var React = require('react');

var Home = React.createClass({
  render: function(){
    return (
      <div className="jumbotron">
        <h1>Book Administration</h1>
        <p>React , Router , more pages. </p>
      </div>
    );
  }
});

module.exports = Home;
