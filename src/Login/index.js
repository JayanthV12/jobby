import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showError: false,
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  success = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    this.setState({showError: false, errorMsg: ''})
  }

  failure = error => {
    this.setState({errorMsg: error, showError: true})
  }

  submitClick = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.submitClick}>
            <div className="input-container">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="inputEl"
                onChange={this.changeUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="inputEl"
                onChange={this.changePassword}
              />
            </div>
            <div>
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
            {showError && <p className="para">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
