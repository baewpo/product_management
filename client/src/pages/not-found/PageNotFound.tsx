import { Link } from 'react-router-dom'
import  './style.scss'

function PageNotFound() {
  return (
    <div id={'notfound'}>
      <div className={'notfound'}>
        <div className={'notfound-404'}>
          <h1>404</h1>
        </div>
        <h2>Oops! Nothing was found</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
          <Link to="/">Return to homepage</Link>
        </p>
      </div>
    </div>
  )
}

export default PageNotFound
