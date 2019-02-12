import React, { Component } from "react";
import "./TrainRoute.css";

export default class TrainRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { trainNumber: "", trainRouteList: "" };
    this.onChange = this.onChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value }, () =>
      console.log(this.state)
    );
  }

  onSubmitForm(e) {
    e.preventDefault();
    fetch(
      `https://api.railwayapi.com/v2/route/train/${
        this.state.trainNumber
      }/apikey/sch5lj61yy/`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ trainRouteList: data }, () =>
          console.log(this.state.trainRouteList)
        );
      });
    this.setState({ trainNumber: "" });
  }

  render() {
    const { trainRouteList } = this.state;
    let list, route;

    if (!trainRouteList) {
      list = <div className="card">No Trains Details to display.</div>;
      route = <div className="card">No Routes to display. </div>;
    } else {
      list = (
        <div className="card">
          <div className="row">
            <div className="col-md-2 text-left col-md-offset-4">
              Train Name :
            </div>
            <div className="col-md-2 text-left col-md-offset-0">
              {trainRouteList.train.name}
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 text-left col-md-offset-4">
              Train Number :
            </div>
            <div className="col-md-2 text-left col-md-offset-0">
              {trainRouteList.train.number}
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 text-left col-md-offset-4">Class :</div>
            <div className="col-md-2 text-left col-md-offset-0">
              {trainRouteList.train.classes.map(trainClass => (
                <span key={trainClass.code}>{trainClass.code},</span>
              ))}
            </div>
          </div>
        </div>
      );

      route = trainRouteList.route.map(routeInfo => (
        <div key={routeInfo.station.name}>
          <div className="card">
            <div className="row">
              <div className="col-md-2 text-left col-md-offset-4">
                Station :
              </div>
              <div className="col-md-3 text-left col-md-offset-0">
                {routeInfo.station.name}
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 text-left col-md-offset-4">
                Departure Time :
              </div>
              <div className="col-md-3 text-left col-md-offset-0">
                {routeInfo.schdep}
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 text-left col-md-offset-4">
                Arrival Time :
              </div>
              <div className="col-md-3 text-left col-md-offset-0">
                {routeInfo.scharr}
              </div>
            </div>
            <br />
          </div>
          <span className="glyphicon glyphicon-arrow-down" />
        </div>
      ));
    }

    return (
      <div>
        <div className="container">
          <form
            onSubmit={this.onSubmitForm}
            className="col-md-8 col-md-offset-4"
          >
            <div className="row">
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control input-lg"
                  placeholder="Train Number"
                  id="trainNumber"
                  value={this.state.trainNumber}
                  onChange={this.onChange}
                />
              </div>

              <div className="col-md-1">
                <button type="submit" className="btn btn-warning btn-lg">
                  Check Route
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="container text-center">
          <div className="jumbotron">
            <h4>Train Details</h4>
            {list}
          </div>
          <div className="jumbotron">
            <h4>Train Route</h4>
            {route}
          </div>
        </div>
      </div>
    );
  }
}
