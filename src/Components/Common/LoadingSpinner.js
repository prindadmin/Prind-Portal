
import { Spinner, Intent } from '@blueprintjs/core'
import * as Strings from '../../Data/Strings'

function LoadingSpinner() {
  return (
    <div className='projects-loading-container fill'>
      <div className='loading-spinner'>
        <Spinner size={100} intent={Intent.DANGER} />
        <p>{Strings.GIT_TEXT_LOADING}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
