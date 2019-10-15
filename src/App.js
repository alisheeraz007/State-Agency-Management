import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './all.css';
import 'antd/dist/antd.css'
import { getData } from './actions/action';
import { connect } from 'react-redux'
import firebase from 'firebase';
import config from './config/configKey'
import SignInSignUp from './SignInSignUp';
import AddData from "./components/afterLogin/add"
import AllData from "./components/afterLogin/All"
import RentData from "./components/afterLogin/rent"
import OwnershipData from "./components/afterLogin/ownership"
import SoldData from "./components/afterLogin/sold"
import SeeMore from './components/afterLogin/seeMore';

firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  onAuthStateChanged = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref("wholeData").child(user.uid).on('value', (snap) => {
          let obj;
          if (snap.val()) {
            obj = {
              type: "WholeData",
              payload: snap.val()
            }
            this.props.getData(obj.payload)
          }
        });
      } else {
        this.props.history.push('/')
      }
    });
  }

  componentWillMount() {
    this.onAuthStateChanged()
  }

  render() {
    return (
      <div>
        <Router>

          <Route
            exact path="/"
            render={() => <SignInSignUp
              state={this.state}
            />} />

          <Route
            path="/Add"
            render={() => <AddData
              state={this.state}
            />} />

          <Route
            path="/All"
            render={() => <AllData
              state={this.state}
            />} />

          <Route
            path="/Rent"
            render={() => <RentData
              state={this.state}
            />} />

          <Route
            path="/Ownership"
            render={() => <OwnershipData
              state={this.state}
            />} />

          <Route
            path="/Sold"
            render={() => <SoldData
              state={this.state}
            />} />

          <Route
            path="/SeeMore/:topicId"
            render={() => <SeeMore
              state={this.state}
            />} />

        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    state
  }
}

const matchDispatchToProps = { getData }

export default connect(mapStateToProps, matchDispatchToProps)(App);
