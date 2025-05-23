import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import NxtMartContext from '../../context/Context'
import './header.css'

const Header = props => {
  const {componentName, history} = props

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <NxtMartContext.Consumer>
      {value => {
        const {cartList} = value

        const saveToLocalStorage = () => {
          /* works only when the home component is active */
          if (componentName === 'home') {
            localStorage.setItem('cartData', JSON.stringify(cartList))
          }
        }

        return (
          <div className="header-container">
            <img src="https://i.imgur.com/iZpoPGA.png" alt="website logo" />
            <div className="nav-link-container">
              <Link to="/" className="anchor-link">
                <button
                  type="button"
                  className={
                    componentName === 'home' ? 'selectedNavText' : 'btn'
                  }
                >
                  Home
                </button>
                {componentName === 'home' ? (
                  <img
                    className="home-icon"
                    src="https://i.imgur.com/Ni5xBzf.jpeg"
                    alt="active-home-icon"
                  />
                ) : (
                  <img
                    className="home-icon"
                    src="https://i.imgur.com/Q6o1c3c.jpeg"
                    alt="inactive-home-icon"
                  />
                )}
              </Link>
              <Link to="/cart" className="anchor-link">
                <button
                  type="button"
                  className={
                    componentName === 'cart' ? 'selectedNavText' : 'btn'
                  }
                  onClick={saveToLocalStorage}
                >
                  Cart
                </button>
                {componentName === 'cart' ? (
                  <img
                    className="cart-icon"
                    src="https://i.imgur.com/718CvbZ.png"
                    alt="active-cart-icon"
                  />
                ) : (
                  <img
                    onClick={saveToLocalStorage}
                    className="cart-icon"
                    src="https://i.imgur.com/9yKlDG9.png"
                    alt="inactive-cart-icon"
                  />
                )}
              </Link>
              <div>
                <div className="logout-btn-container">
                  <button onClick={handleLogout} type="button" className="btn">
                    <img
                      height="16px"
                      src="https://i.imgur.com/PV0lPDh.png"
                      alt="logout-btn"
                    />
                    Logout
                  </button>
                </div>
                <img
                  onClick={handleLogout}
                  className="logout-icon"
                  height="20px"
                  src="https://i.imgur.com/tAGK2Ps.png"
                  alt="logout-icon"
                />
              </div>
            </div>
          </div>
        )
      }}
    </NxtMartContext.Consumer>
  )
}

export default withRouter(Header)
