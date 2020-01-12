import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./js/components/PrivateRoute";
import ChatPage from "./js/views/ChatPage";
import LoginPage from "./js/views/LoginPage";

import configureStore from "./js/store";
import "./scss/main.scss";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={ChatPage} />
          <Route path="/login" component={LoginPage}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
