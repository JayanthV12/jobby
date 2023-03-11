import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props

  const onLogoutClick = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <ul className="unordered-container">
        <li className="list-item">
          <Link to="/" className="link-item">
            Home
          </Link>
        </li>
        <li className="list-item">
          <Link to="/jobs" className="link-item">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" className="logout-button" onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
