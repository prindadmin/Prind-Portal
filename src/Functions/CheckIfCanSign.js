
export function CheckIfCanSign(userRedux) {

  if (userRedux === undefined) {
    console.warn("Did not provide CheckIfCanSign with the user details from the redux store");
    return false
  }

  try {
    // const { foundationsId } = userRedux.details

    // if (foundationsId === undefined) {
      return false
    // }
    // return true
  }
  catch (e) {
    return false;
  }
}

export default CheckIfCanSign
