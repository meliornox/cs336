/* React is all about modular, composable components.
 *
 *- CommentBox
 * - CommentList
 *  - Comment
 * - CommentForm
 *
 * @author: Jay
 * @date:   11/02/16
 *
 * This tutorial: https://web.archive.org/web/20161019043332/https://facebook.github.io/react/docs/tutorial.html
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import CommentBox from './commentBox';
import CommentEdit from './commentEdit';

import '../css/base.css';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={CommentBox}/>
        <Route path="/:id" component={CommentEdit} />
    </Router>
), document.getElementById('content')
);