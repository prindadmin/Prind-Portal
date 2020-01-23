import axios from 'axios'
import https from 'https'

// TODO: Make this return something useful rather than a JSON

// The returned data should include at least two fields:
//    id
//    name

export default function(identityToken, newProjectDetails) {

  return new Promise((resolve, reject) => {

    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': identityToken,
      }
    });



    instance.get(`${process.env.PUBLIC_URL}/createdProject.json`, newProjectDetails)
    .then(res => {

      //Remove the next 5 lines and remove the comment from the 5th line
      console.log(res)
      var editedResult = res
      editedResult.data.name = newProjectDetails.projectName
      console.log(editedResult)
      resolve(editedResult)
      //resolve(res)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
