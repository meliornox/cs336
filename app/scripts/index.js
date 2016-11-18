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

import CommentBox from './commentBox';

import '../css/base.css';

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000}/>,
    document.getElementById('content')
);
