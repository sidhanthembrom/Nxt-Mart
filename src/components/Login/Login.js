import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './login.css'

class Login extends Component {
  state = {username: '', password: '', isVisible: false, errorText: ''}

  handleUsername = e => {
    this.setState({username: e.target.value})
  }

  handlePassword = e => {
    this.setState({password: e.target.value})
  }

  handleCheckbox = e => {
    if (e.target.checked) {
      this.setState({isVisible: true})
    } else {
      this.setState({isVisible: false})
    }
  }

  handleLogin = async e => {
    e.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    // console.log(data)

    if (data.jwt_token !== undefined) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 1})

      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorText: data.error_msg})
    }
  }

  render() {
    const {username, password, isVisible, errorText} = this.state

    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginpage-container">
        <div className="loginform-container">
          <div className="login-logo-container">
            <img
              className="login-logo"
              src="https://i.imgur.com/iZpoPGA.png"
              alt="login website logo"
            />
          </div>
          <form onSubmit={this.handleLogin}>
            <div className="label-and-input-container">
              <label htmlFor="username">Username</label>
              <div className="inputbox-container">
                <img
                  src="https://i.imgur.com/mCDRnpM.png"
                  alt="username-icon"
                  height="16px"
                  width="16px"
                />
                <input
                  value={username}
                  id="username"
                  type="text"
                  onChange={this.handleUsername}
                />
              </div>
            </div>
            <div className="label-and-input-container">
              <label htmlFor="password">Password</label>
              <div className="inputbox-container">
                <img
                  src="https://i.imgur.com/59BrE0Q.png"
                  alt="password-icon"
                  height="16px"
                  width="16px"
                />
                <input
                  value={password}
                  id="password"
                  type={isVisible ? 'text' : 'password'}
                  onChange={this.handlePassword}
                />
              </div>
              <div className="show-password-container">
                <input
                  id="checkbox"
                  type="checkbox"
                  onChange={this.handleCheckbox}
                />
                <label className="checkbox-label" htmlFor="checkbox">
                  Show Password
                </label>
              </div>
            </div>
            {username === '' && password === '' ? (
              <button className="login-btn-before-details" type="submit">
                Login
              </button>
            ) : (
              <button className="login-btn-after-details" type="submit">
                Login
              </button>
            )}
            {errorText && <p className="red">{errorText}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
