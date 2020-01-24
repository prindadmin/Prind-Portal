const pageDetails = {
  Inception: {},
  Feasibility: {},
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

export default pageDetails
