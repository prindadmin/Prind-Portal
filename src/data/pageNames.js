
import * as Endpoints from './Endpoints'

const PAGENAMES = {
  CDM2015Project: {
    project: {
      id: "projectDetails",
      name: "Project Details",
      linkTo: Endpoints.PROJECTDETAILSPAGE,
      isStagePage: false,
    },
    team: {
      id: "projectTeam",
      name: "Project Team",
      linkTo: Endpoints.PROJECTTEAMPAGE,
      isStagePage: false,
    },
    inception: {
      id: "stageInception",
      name: "Inception",
      linkTo: Endpoints.INCEPTIONPAGE,
      isStagePage: true,
    },
    feasibility: {
      id: "stageFeasibility",
      name: "Feasibility",
      linkTo: Endpoints.FEASIBILITYPAGE,
      isStagePage: true,
    },
    design: {
      id: "stageDesign",
      name: "Design",
      linkTo: Endpoints.DESIGNPAGE,
      isStagePage: true,
    },
    tender: {
      id: "stageTender",
      name: "Tender",
      linkTo: Endpoints.TENDERPAGE,
      isStagePage: true,
    },
    construction: {
      id: "stageConstruction",
      name: "Construction",
      linkTo: Endpoints.CONSTRUCTIONPAGE,
      isStagePage: true,
    },
    handover: {
      id: "stageHandover",
      name: "Handover",
      linkTo: Endpoints.HANDOVERPAGE,
      isStagePage: true,
    },
    occupation: {
      id: "stageOccupation",
      name: "Occupation",
      linkTo: Endpoints.OCCUPATIONPAGE,
      isStagePage: true,
    },
    refurbishment: {
      id: "stageRefurbishment",
      name: "Refurbishment",
      linkTo: Endpoints.REFURBISHMENTPAGE,
      isStagePage: true,
    }
  },
  DHSFProject: {
    project: {
      id: "projectDetails",
      name: "Project Details",
      linkTo: Endpoints.PROJECTDETAILSPAGE,
      isStagePage: false,
    },
    team: {
      id: "projectTeam",
      name: "Project Team",
      linkTo: Endpoints.PROJECTTEAMPAGE,
      isStagePage: false,
    },
    occupation: {
      id: "stageOccupation",
      name: "HSF",
      linkTo: Endpoints.OCCUPATIONPAGE,
      isStagePage: true,
    },
  },
  CommonPages: [
    'newproject', 'profile', 'foundations', 'team', 'project'
  ]
}

export default PAGENAMES
