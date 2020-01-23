import React, { Component } from 'react';
import './App.css';

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { AUTH_SUCCESS } from './states'

import * as Endpoints from './endpoints'

import PrivateRoute from './components/PrivateRoute';

import Auth from './components/Auth';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';

import WelcomePage from './components/WelcomePage';
import InceptionPage from './components/InceptionPage';
import NewProjectPage from './components/NewProjectPage';

import GenericPage from './components/GenericPage';
import TrainingPage from './components/TrainingPage';

const pageDetails = {
  Feasibility: {
    name: "Feasibility",
    title: "Project Feasibility",
    description: "To confirm that the project brief is feasible it will be necessary to perform investigations which can be compiled into a feasibility study.",
    questions: [
      {
        id: 0,
        title: "Please upload your feasibility study",
        prompt: "Choose File...",
        hasChosen: false,
        hasHash: false,
        hasSubmitted: false,
        hasReceived: false,
        hasSuccess: false,
        status: "missing",
      }
    ]
  },
  Design: {
    name: "Design",
    title: "Project Design",
    description: "The Appointed design team will be collectively identifying hazards and considering mitagations for potential risks.  The assessment of risks will be complied into a single Design Risk Register.",
    questions: [
      {
        id: 0,
        title: "Please Upload your Design risk Assessment (DRA)",
        prompt: "Choose File...",
        hasChosen: false,
        hasHash: false,
        hasSubmitted: false,
        hasReceived: false,
        hasSuccess: false,
        status: "missing",
      }
    ]
  },
  Tender: {
    name: "Tender",
    title: "Project Tender",
    description: "The design is complete, you are ready to Build.  You will require a Principal Contractor.  It is the client responsibility to provide Pre-Construction information.",
    questions: [
      {
        id: 0,
        title: "Please upload you Pre-construction information pack.",
        prompt: "Choose File...",
        hasChosen: false,
        hasHash: false,
        hasSubmitted: false,
        hasReceived: false,
        hasSuccess: false,
        status: "missing",
      }
    ]
  },
  Construction: {
    name: "Construction",
    title: "Project Construction",
    description: "You have appointed a Principal contractor (PC).  The PC has full responsibility for Health and Safety during this step.  The PC will provide a Construction Phase Plan (CPP).",
    questions: [
      {
        id: 0,
        title: "Please upload your Construction phase plan (CPP)",
        prompt: "Choose File...",
        hasChosen: false,
        hasHash: false,
        hasSubmitted: false,
        hasReceived: false,
        hasSuccess: false,
        status: "missing",
      }
    ]
  },
  Handover: {
    name: "Handover",
    title: "Project Handover",
    description: "Finally the building is complete.  The PC will have provided a Practical completion Certificate.",
    questions: [
      {
        id: 0,
        title: "Please upload your Practical completion certification",
        prompt: "Choose File...",
        hasChosen: false,
        hasHash: false,
        hasSubmitted: false,
        hasReceived: false,
        hasSuccess: false,
        status: "missing",
      }
    ]
  },
  Occupation: {
    name: "Occupation",
    title: "Project Occupation",
    description: "The Principal Designer has finalised the Project Health and Safety File (HSF).",
    questions: [
      {
        id: 0,
        title: "Please upload the Health and Safety file (HSF)",
        prompt: "Choose File...",
        hasChosen: false,
        hasHash: false,
        hasSubmitted: false,
        hasReceived: false,
        hasSuccess: false,
        status: "missing",
      }
    ]
  },
  Refurbishment: {
    name: "Refurbishment",
    title: "Project Refurbishment",
    description: "Time for refurbishment? If your project will last more that 30 days, start new project.  Demolition? - look forward to helping you.\n\nStart new project",
  }
}

class App extends Component{

  componentDidMount() {
    this.setState({
      pageDetails: pageDetails,
    })
  }


  render() {

    const { auth } = this.props // the props exposed are defined in the container

    return (
      <div className="App full-height">
        <Router>
          <Auth />

          <Switch>
            <Route path='/SignIn' component={SignIn} />
            <Route path='/SignUp' component={SignUp} />
            <Route path='/forgot-password' component={ForgotPassword} />
            <Route path='/change-password' component={ChangePassword} />

            <PrivateRoute path='/Welcome' component={WelcomePage} />
            <PrivateRoute path='/Training' component={TrainPage} />
            <PrivateRoute path='/Inception' component={InceptionPage} />
            <PrivateRoute path='/Feasibility' component={FeasibilityPage} />
            <PrivateRoute path='/Design' component={DesignPage} />
            <PrivateRoute path='/Tender' component={TenderPage} />
            <PrivateRoute path='/Construction' component={ConstructionPage} />
            <PrivateRoute path='/Handover' component={HandoverPage} />
            <PrivateRoute path='/Occupation' component={OccupationPage} />
            <PrivateRoute path='/Refurbishment' component={RefurbishmentPage} />
            <PrivateRoute path='/NewProject' component={NewProjectPage} />

            <Route path='/'
              render={() =>
                auth.isSignedIn === AUTH_SUCCESS ? (
                  <Redirect to={Endpoints.defaultLoggedInPage} />
                ) : (
                  <Redirect to={Endpoints.signInPage} />
                )
              }
            />
          </Switch>

        </Router>
      </div>
    )
  }
}

function TrainPage() {
  return <TrainingPage pageDetails={pageDetails["Training"]} />
}

function FeasibilityPage() {
  return <GenericPage pageDetails={pageDetails["Feasibility"]} />
}

function DesignPage() {
  return <GenericPage pageDetails={pageDetails["Design"]} />
}

function TenderPage() {
  return <GenericPage pageDetails={pageDetails["Tender"]} />
}

function ConstructionPage() {
  return <GenericPage pageDetails={pageDetails["Construction"]} />
}

function HandoverPage() {
  return <GenericPage pageDetails={pageDetails["Handover"]} />
}

function OccupationPage() {
  return <GenericPage pageDetails={pageDetails["Occupation"]} />
}

function RefurbishmentPage() {
  return <GenericPage pageDetails={pageDetails["Refurbishment"]} />
}

export default App;
