import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HeaderBar from './components/common/HeaderBar';
import GenericPage from './components/GenericPage';
import TrainingPage from './components/TrainingPage';
import ListItem from './components/common/page-tile'
import Footer from './components/common/footer'

import PageChooserSection from './components/layouts/PageChooserSection'
import ContentSection from './components/layouts/ContentSection'

const pageDetails = {
  Welcome: {
    name: "Welcome",
    title: "Welcome to Prin-D",
    description: "Prin-D is is a Blockchain enabled platform designed to ensure compliance CDM2015 regulations.  Prin-D uses the Principal Designer work-flow to assist project clients and designers with their CDM duties.  Further TRAINING is available at...",
  },
  Training: {
    name: "Training",
    title: "Training Courses",
    description: "Training course description.",
    providers: [
      {
        name: "Association for Project Safety",
        courses: [
          {
            id: 0,
            name: "Design Risk Management and CDM2015",
            passed: false,
          },
          {
            id: 1,
            name: "Introduction to Principal Designer role",
            passed: true,
          },
        ]
      },
      {
        name: "University of Salford",
        courses: [
          {
            id: 0,
            name: "course x",
            passed: false,
          },
          {
            id: 1,
            name: "course y",
            passed: false,
          },
        ]
      }
    ]
  },
  Inception: {
    name: "Inception",
    title: "Project Inception",
    description: "Inception of a project begins with the Idea.  This Idea is captured in a project Brief.",
    questions: [
      {
        id: 0,
        title: "Please upload your project brief",
        prompt: "Choose File...",
        hasChosen: false,
        hasHash: false,
        hasSubmitted: false,
        hasReceived: false,
        hasSuccess: false,
        status: "missing",
      },
      {
        id: 1,
        title: "Please upload your XXXXXXXXXXXX",
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

  render() {

    return (
      <div className="App">
        <Router>
          <div className="App-header">
            <HeaderBar
              companyName='Prin-D'
            />
          </div>
          <div className="All-Content full-height">
            <PageChooserSection>
              {
                Object.keys(pageDetails).map(key => (
                  <a key={pageDetails[key].name} href={`/${pageDetails[key].name}`}>

                    <ListItem
                      pageDetails={pageDetails[key]}
                      selected={pageDetails[key].name.toString() === window.location.pathname.replace("/", "")}
                      onClick={() => {
                        this.props.history.push(`/${pageDetails[key].name}`)
                      }}
                    />
                  </a>
                ))
              }
            </PageChooserSection>

            <ContentSection>
              <div className='container-fluid full-width'>
                <div id='working-area' className='col-12'>
                  <Switch>
                    <Route exact path='/' component={WelcomePage} />
                    <Route path='/Training' component={TrainPage} />
                    <Route path='/Inception' component={InceptionPage} />
                    <Route path='/Feasibility' component={FeasibilityPage} />
                    <Route path='/Design' component={DesignPage} />
                    <Route path='/Tender' component={TenderPage} />
                    <Route path='/Construction' component={ConstructionPage} />
                    <Route path='/Handover' component={HandoverPage} />
                    <Route path='/Occupation' component={OccupationPage} />
                    <Route path='/Refurbishment' component={RefurbishmentPage} />
                    <Route component={ WelcomePage } />
                  </Switch>
                </div>
              </div>
            </ContentSection>
          </div>
          <Footer />
        </Router>
      </div>
    )
  }
}

function WelcomePage() {
  return <GenericPage pageDetails={pageDetails["Welcome"]} />
}

function TrainPage() {
  return <TrainingPage pageDetails={pageDetails["Training"]} />
}

function InceptionPage() {
  return <GenericPage pageDetails={pageDetails["Inception"]} />
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
