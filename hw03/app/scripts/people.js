import React from 'react';
import Remarkable from 'remarkable';

module.exports = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div className="people">
                <h2 className="peopleName" >
  		    {this.props.first} {this.props.last}, {this.props.id}, {this.props.start}
                </h2>
            </div>
        );
    }
});