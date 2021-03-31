
const PAGENAMES = {
  CDM2015Project: {
    project: {
      id: "projectDetails",
      name: "Project Details",
      linkTo: "/project",
      isStagePage: false,
    },
    team: {
      id: "projectTeam",
      name: "Project Team",
      linkTo: "/team",
      isStagePage: false,
    },
    inception: {
      id: "stageInception",
      name: "Inception",
      linkTo: "/inception",
      isStagePage: true,
    },
    feasibility: {
      id: "stageFeasibility",
      name: "Feasibility",
      linkTo: "/feasibility",
      isStagePage: true,
    },
    design: {
      id: "stageDesign",
      name: "Design",
      linkTo: "/design",
      isStagePage: true,
    },
    tender: {
      id: "stageTender",
      name: "Tender",
      linkTo: "/tender",
      isStagePage: true,
    },
    construction: {
      id: "stageConstruction",
      name: "Construction",
      linkTo: "/construction",
      isStagePage: true,
    },
    handover: {
      id: "stageHandover",
      name: "Handover",
      linkTo: "/handover",
      isStagePage: true,
    },
    occupation: {
      id: "stageOccupation",
      name: "Occupation",
      linkTo: "/occupation",
      isStagePage: true,
    },
    refurbishment: {
      id: "stageRefurbishment",
      name: "Refurbishment",
      linkTo: "/refurbishment",
      isStagePage: true,
    }
  },
  DHSFProject: {
    project: {
      id: "projectDetails",
      name: "Project Details",
      linkTo: "/project",
      isStagePage: false,
    },
    team: {
      id: "projectTeam",
      name: "Project Team",
      linkTo: "/team",
      isStagePage: false,
    },
    occupation: {
      id: "stageOccupation",
      name: "HSF",
      linkTo: "/occupation",
      isStagePage: true,
    },
  },
  CommonPages: [
    'newproject', 'profile', 'foundations', 'team', 'project'
  ]
}

export default PAGENAMES
