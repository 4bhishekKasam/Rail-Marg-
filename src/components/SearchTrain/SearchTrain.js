import React, { Component } from "react";
//import axios from "axios";
import "./SearchTrain.css";

export default class SearchTrain extends Component {
  constructor(props) {
    super(props);
    this.state = { to: "", from: "", date: "", trainList: "" };
    this.onChange = this.onChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.fetchTrainList = this.fetchTrainList.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value }, () =>
      console.log(this.state)
    );
  }

  onSubmitForm(e) {
    e.preventDefault();
    let journeyDate = this.dateFormatter(this.state.date);
    console.log(journeyDate);
    this.setState({ date: journeyDate }, () => this.fetchTrainList());
    // console.log(this.state);
  }

  fetchTrainList() {
    fetch(
      `https://api.railwayapi.com/v2/between/source/${this.state.from}/dest/${
        this.state.to
      }/date/${this.state.date}/apikey/sch5lj61yy/`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ trainList: data }, () =>
          console.log(this.state.trainList)
        );
      });
  }

  dateFormatter(date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date)
      .toLocaleDateString("en-IN", options)
      .split("/")
      .join("-");
  }

  render() {
    const { trainList } = this.state;

    let trains;
    if (!trainList) {
      trains = (
        <div className="card">
          <div className="row">
            <div className="col-md-12 text-center">No Trains to display.</div>
          </div>
        </div>
      );
    } else {
      trains = trainList.trains.map(train => (
        <div key={train.number}>
          <div className="card">
            <div className="row">
              <div className="col-md-6 text-left ">
                Train Name : <b>{train.name}</b> ({train.number}){" "}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 text-left">
                From : {train.from_station.name} ({train.from_station.code}){" "}
              </div>
              <div className="col-md-6 text-left">
                To : {train.to_station.name} ({train.to_station.code}){" "}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 text-left">
                Departure Time : {train.src_departure_time}
              </div>
              <div className="col-md-6 text-left">
                Arrival Time : {train.dest_arrival_time}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 text-left">
                Travel Time : {train.travel_time}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 text-left">
                Days :{" "}
                {train.days.map(day => (
                  <span key={day.code}>{day.code}, </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ));
    }

    return (
      <div className="container">
        <form onSubmit={this.onSubmitForm}>
          <div className="row align-items-center">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control input-lg"
                placeholder="Journey from (stn code)"
                id="from"
                value={this.state.from}
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control input-lg"
                placeholder="Journey to (stn code)"
                id="to"
                value={this.state.to}
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control input-lg"
                placeholder="Journey date"
                id="date"
                value={this.state.date}
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-3">
              <button type="submit" className="btn btn-warning btn-lg">
                Search Trains
              </button>
            </div>
          </div>
        </form>

        <div className="container text-center">
          <div className="row text-center">
            <h4>
              Total Trains :{" "}
              {trainList.total ? (
                <span className="badge badge-pill badge-dark">
                  {trainList.total}
                </span>
              ) : null}
            </h4>
          </div>
          <div className="jumbotron">
            <h4>Train List</h4>
            {trains}
          </div>
        </div>
      </div>
    );
  }
}
