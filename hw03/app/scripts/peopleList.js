import React from 'react';
import Remarkable from 'remarkable';

import People from './people.js';

module.exports = React.createClass({
    render: function() {
	if (this.props.data) {
	var peopleNodes = this.props.data.map(function(people) {
	    return (
		<People id={people.id} first={people.first} last={people.last} start={people.start} key={people.id}>
		</People>
	    );
	});
	}
	return (
	    <div className="peopleList">
		{peopleNodes}
	    </div>
	);
    }
});
