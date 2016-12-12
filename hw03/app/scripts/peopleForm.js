import React from 'react';
import Remarkable from 'remarkable';

import PeopleList from './peopleList.js';

module.exports = React.createClass({
    getInitialState: function() {
	return {personId: '', firstName: '', lastName: '', years: ''};
    },
    handleIdChange: function(e) {
	this.setState({id: e.target.value});
    },
    handleFirstChange: function(e) {
	this.setState({first: e.target.value});
    },
    handleLastChange: function(e) {
	this.setState({last: e.target.value});
    },
    handleStartChange: function(e) {
	this.setState({start: e.target.value});
    },
    handleSubmit: function(e) {
	e.preventDefault();
	var id = this.state.id.trim();
	var first = this.state.first.trim();
	var last = this.state.last.trim();
	var start = this.state.start.trim();
	if(!id || !first || !last || !start) {
	    return;
	}
	this.props.onPersonSubmit({id: id, first: first, last: last, start: start})
	this.setState({id: '', first: '', last: '', years: ''});
    },
    render: function() {
	return (
	    <form className="peopleForm" onSubmit={this.handleSubmit}>
		<input type="id" placeholder="ID" value={this.state.id} onChange={this.handleIdChange}
	 	/> {}
		<input type="first" placeholder="First Name" value={this.state.first} onChange={this.handleFirstChange}
	 	/> {}
		<input type="last" placeholder="Last Name" value={this.state.last} onChange={this.handleLastChange}
	 	/> {}
		<input type="start" placeholder="Start Date- mm/dd/yyyy" value={this.state.start} onChange={this.handleStartChange}
	 	/> {}
                <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
            </form>
        );
    }
});
