import * as Strings from './Strings'

const PAGENAMES = {
  CDM2015Project: {
    project: {
      name: "Project Details",
      linkTo: "/project"
    },
    team: {
      name: "Project Team",
      linkTo: "/team"
    },
    inception: {
      name: "Inception",
      linkTo: "/inception"
    },
    feasibility: {
      name: "Feasibility",
      linkTo: "/feasibility"
    },
    design: {
      name: "Design",
      linkTo: "/design"
    },
    tender: {
      name: "Tender",
      linkTo: "/tender"
    },
    construction: {
      name: "Construction",
      linkTo: "/construction"
    },
    handover: {
      name: "Handover",
      linkTo: "/handover"
    },
    occupation: {
      name: "Occupation",
      title: Strings.OCCUPATION_PAGE_TITLE,
      description: Strings.OCCUPATION_PAGE_DESCRIPTION,
      linkTo: "/occupation"
    },
    refurbishment: {
      name: "Refurbishment",
      linkTo: "/refurbishment"
    }
  },
  DHSFProject: {
    project: {
      name: "Project Details",
      title: Strings.EDIT_PROJECT_DETAILS,
      description: '',
      linkTo: "/project"
    },
    team: {
      name: "Project Team",
      title: Strings.PROJECT_DIRECTORY_TITLE,
      description: '',
      linkTo: "/team"
    },
    occupation: {
      name: "HSF",
      title: Strings.DHSF_PAGE_TITLE,
      description: Strings.DHSF_PAGE_DESCRIPTION,
      linkTo: "/occupation"
    },
  },
  CommonPages: [
    'newproject', 'profile', 'foundations', 'team', 'project'
  ]
}

export default PAGENAMES
