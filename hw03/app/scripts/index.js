/* React is all about modular, composable components.
 *
 *- PeopleBox
 * - PeopleList
 *  - People
 * - PeopleForm
 *
 * @author: Jay
 * @date:   12/07//16
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/base.css';

import PeopleBox from './peopleBox.js';

ReactDOM.render(
  <PeopleBox url="/people" pollInterval={2000} />,
  document.getElementById('content')
);