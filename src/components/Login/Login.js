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
                  placeholder="Username"
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
                  placeholder="Password"
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
          <div className="demo-credentials-container">
            <h3 className="demo-credentials-title">Demo Credentials:</h3>
            <div className="img-container-with-text">
              <img
                height="15px"
                src="https://media-hosting.imagekit.io/a97e54910f0f46df/user.png?Expires=1841150697&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=J-fins-cD38301XXOUx~onf4V4wWPii8D2Ly-DZtOlnw3yijt4nXgHV9twbGVvDHHNkggdqQjhkkU8L4omSjCO5YQDlYTbF43CADzTzY8cXGtEz2W3OCWGJqTZg7ap~seSi66lAc134c-o4Hm3xXoSTeV0TE7tQ3eHnrI4R8EJwYcAbhVsrYqTgw2aNkJQrE2w~PAcF~n2~9a~OrKu4AFcuP7MjvRpMkPBGKG82SCfHR~Z1nBNl1TmoKE19NdWreBpWwj5ThhnavSFOqDTMxDStvKgtVCtAeWkvhGgtbLjIoF5TYd1-10SOvkT-FSpyHvswIdH6n9URySZwYA53pOA__"
                alt="username-icon"
              />
              <p>rahul</p>
            </div>
            <div className="img-container-with-text">
              <img
                height="16px"
                src="https://media-hosting.imagekit.io/c9053b4c997b4640/padlock.png?Expires=1841149277&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=stMSBv~xD1fbxCQErUBH0NepflvXwtZtwskDUVGz96KDzTCm5Y6pbgF5BgjKbjM5TALOloqa5bKVNbD6exezkikd25s~uWzPo3uM6ztIRYjY9S1P8-2LdWM6KS2UjlA8YyVbc06-CoF52Ip8gofEod1GwXoil7WuepO6qW5NDZnvLIV4n81nA0FceiUiQXQlhQe78z6w6d~-ZQm3cWCJ6O4rp9hzy2N1RRPTzjOiH~8l4MrX3X9R26wNDPmJ1a7Nl26m9cNyN5zZJiry1fgYldU0eSBiJ5pU3r3fKKDbAQk-1BXo4-pn~xdAuzhQOUsZVuc0tcEG4GfVbw2hLfGNzw__"
                alt="password-icon"
              />
              <p>rahul@2021</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
