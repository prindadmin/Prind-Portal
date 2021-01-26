
const PAGENAMES = {
  CDM2015Project: {
    project: {
      name: "Project Details",
      linkTo: "/project",
      isStagePage: false,
    },
    team: {
      name: "Project Team",
      linkTo: "/team",
      isStagePage: false,
    },
    inception: {
      name: "Inception",
      linkTo: "/inception",
      isStagePage: true,
    },
    feasibility: {
      name: "Feasibility",
      linkTo: "/feasibility",
      isStagePage: true,
    },
    design: {
      name: "Design",
      linkTo: "/design",
      isStagePage: true,
    },
    tender: {
      name: "Tender",
      linkTo: "/tender",
      isStagePage: true,
    },
    construction: {
      name: "Construction",
      linkTo: "/construction",
      isStagePage: true,
    },
    handover: {
      name: "Handover",
      linkTo: "/handover",
      isStagePage: true,
    },
    occupation: {
      name: "Occupation",
      linkTo: "/occupation",
      isStagePage: true,
    },
    refurbishment: {
      name: "Refurbishment",
      linkTo: "/refurbishment",
      isStagePage: true,
    }
  },
  DHSFProject: {
    project: {
      name: "Project Details",
      linkTo: "/project",
      isStagePage: false,
    },
    team: {
      name: "Project Team",
      linkTo: "/team",
      isStagePage: false,
    },
    occupation: {
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
