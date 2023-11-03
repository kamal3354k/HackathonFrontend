import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import DetailPage from './pages/DetailPage/DetailPage';
import Header from './components/header/Header';

const App = () => {
  return (
    <div className="App">
      {/* <div className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/detailPage">detailPage</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div> */}
      <div className="App-intro">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail-page" component={DetailPage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
