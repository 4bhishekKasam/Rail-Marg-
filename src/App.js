import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SearchTrain from "./components/SearchTrain/SearchTrain";
import LandingPage from "./components/LandingPage/LandingPage";
import TrainRoute from "./components/TrainRoute/TrainRoute";
import Footer from "./components/Footer/Footer";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" component={LandingPage} exact />
            <Route path="/searchtrain" component={SearchTrain} exact />
            <Route path="/trainroute" component={TrainRoute} exact />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
