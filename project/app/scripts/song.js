import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

module.exports = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div className="song">
                <h2 className="songTitle" >
                    {this.props.title}
                </h2>
                <h3 className="songArtist" >
                    {this.props.artist}
                </h3>
                <h4 className="songLink" >
                    {this.props.link}
                </h4>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
		<Link to={'/' + this.props.id}>Edit</Link>
            </div>
        );
    }
});