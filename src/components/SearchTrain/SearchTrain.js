import React, { Component } from "react";
import axios from "axios";
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
    axios
      .get(
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

    return (
      <div className="container">
        <form onSubmit={this.onSubmitForm}>
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control input-lg"
                placeholder="Journey from"
                id="from"
                value={this.state.from}
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control input-lg"
                placeholder="Journey to"
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
            <div className="col-md-1">
              <button type="submit" className="btn btn-warning btn-lg">
                Search Trains
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
