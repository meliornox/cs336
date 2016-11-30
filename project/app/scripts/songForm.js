import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
    getInitialState: function() {
        return {title: '', artist: '', lyrics: '', link: ''};
    },
    handleTitleChange: function(e) {
        this.setState({title: e.target.value});
    },
    handleArtistChange: function(e) {
        this.setState({artist: e.target.value});
    },
    handleLyricsChange: function(e) {
        this.setState({lyrics: e.target.value});
    },
    handleLinkChange: function(e) {
        this.setState({link: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var artist = this.state.artist.trim();
        var lyrics = this.state.lyrics.trim();
        var link = this.state.link.trim();
        if ((!title || !artist) || (!lyrics || !link)) {
            return;
        }
        this.props.onSongSubmit({title: title, artist: artist, lyrics: lyrics, link: link});
        this.setState({title: '', artist: '', lyrics: '', link: ''});
    },
    render: function() {
        return (
            <form className="songForm" onSubmit={this.handleSubmit}>
                <input className="ui-widget ui-corner-all" type="text" placeholder="title..."
                    value={this.state.title} onChange={this.handleTitleChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="artist..."
                    value={this.state.artist} onChange={this.handleArtistChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="lyrics..."
                    value={this.state.lyrics} onChange={this.handleLyricsChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="link..."
                    value={this.state.link} onChange={this.handleLinkChange}
                />
                <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
            </form>
        );
    }
});