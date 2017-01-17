import React from 'react'
import ReactDOM from 'react-dom'
import "./styles/style";
import routes from './constants/routes';

let location;

var onHashChange = () => {
  location = routes.lookup(window.location.hash.substr(1));
};

window.addEventListener('hashchange', onHashChange, false);
onHashChange();

const APP_NODE = document.getElementById('app');

const App = (props) => {
  return (
    <div>asdf</div>
  );
}

ReactDOM.render(<App />, APP_NODE);
