import React from 'react';
import $ from 'jquery';

import PeopleList from './peopleList.js';
import PeopleForm from './peopleForm.js';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: []};
    },

    loadPeopleFromServer: function() {
	$.ajax({
	    url: this.props.url,
	    dataType: 'json',
	    cache: false,
	})
        .done(function(result){
            this.setState({data: result});
        }.bind(this))
        .fail(function(xhr, status, errorThrown) {
            console.error(this.props.url, status, errorThrown.toString());
        }.bind(this));
    },
    handlePeopleSubmit: function(person) {
	var people = this.state.people;
	var newPeople = people.concat([person]);
	this.setState({people: newPeople});
	$.ajax({
	    url: this.props.url,
	    dataType: 'json',
	    type: 'POST',
	    data: people,
        })
        .done(function(result){
            this.setState({data: result});
        }.bind(this))
        .fail(function(xhr, status, errorThrown) {
            this.setState({data: people});
            console.error(this.props.url, status, errorThrown.toString());
        }.bind(this));
    },
    componentDidMount: function() {
	this.loadPeopleFromServer();
	setInterval(this.loadPeopleFromServer, this.props.pollInterval);
    },
    render: function() {
	return (
	    <div className="peopleBox">
		<h1>People</h1>
		<PeopleList people = {this.state.people} />
		<PeopleForm onPeopleSubmit={this.handlePeopleSubmit} />
	    </div>
	);
    }
});
