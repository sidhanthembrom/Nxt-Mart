import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './cart.css'

class Cart extends Component {
  // extracting the data and keeping in state
  state = {
    tempArr: JSON.parse(localStorage.getItem('cartData')) || [],
    isPaid: false,
  }

  handleCartItemDecrement = product => {
    const {tempArr} = this.state

    if (product.count === 1) {
      const newArr = tempArr.filter(obj => product.id !== obj.id)

      localStorage.setItem('cartData', JSON.stringify(newArr))
      // helps in re-render
      this.setState({tempArr: newArr})
    } else {
      const newArr = tempArr.map(obj =>
        obj.id === product.id ? {...obj, count: obj.count - 1} : obj,
      )

      // saving after the change
      localStorage.setItem('cartData', JSON.stringify(newArr))
      // helps in re-render
      this.setState({tempArr: newArr})
    }
  }

  handleCartItemIncrement = product => {
    const {tempArr} = this.state

    const newArr = tempArr.map(obj =>
      obj.id === product.id ? {...obj, count: obj.count + 1} : obj,
    )
    localStorage.setItem('cartData', JSON.stringify(newArr))
    this.setState({tempArr: newArr})
  }

  handleCheckoutBtn = () => {
    // console.log('checkout')
    localStorage.removeItem('cartData')
    this.setState({isPaid: true})
  }

  render() {
    const {tempArr, isPaid} = this.state

    // calculating the total price of the cart
    const totalPrice = tempArr.reduce((sum, product) => {
      const numericPrice = parseFloat(product.price.slice(1))
      return sum + numericPrice * product.count
    }, 0)

    return (
      <div className="cart-page-container">
        <Header componentName="cart" />
        {isPaid && (
          <div className="cart-successful-page-container">
            <div className="cart-successful-dialog-box">
              <img
                src="https://i.imgur.com/LrzksBz.png"
                alt="payment-successful-icon"
              />
              <h2>Payment Successful</h2>
              <p>Thank you for ordering</p>
              <p>Your payment is successfully completed.</p>
              <Link to="/">
                <button
                  type="button"
                  className="checkout-btn return-to-homepage-btn"
                >
                  Return to Homepage
                </button>
              </Link>
            </div>
          </div>
        )}

        {!isPaid && tempArr.length === 0 && (
          <div className="empty-cart-view">
            <div className="cart-icon-with-text">
              <img
                height="30px"
                width="50px"
                src="https://i.imgur.com/bBmXkYx.png"
                alt="empty cart"
              />
              <h1>Your cart is empty</h1>
            </div>
          </div>
        )}

        {!isPaid && tempArr.length > 0 && (
          <div className="cart-list-box-container">
            <h2 className="title-for-desktop">Items</h2>
            <h3 className="title-for-mobile">Checkout</h3>
            <div className="cart-list-box">
              <ul>
                {tempArr.map(product => (
                  <li
                    data-testid="cartItem"
                    key={product.id}
                    className="list-item"
                  >
                    <div className="product-details-cart-item">
                      <img
                        height="100px"
                        width="150px"
                        src={product.image}
                        alt={product.name}
                      />
                      <div>
                        <span>{product.name}</span>
                        <span className="quantity">{product.weight}</span>
                        <span className="price">{product.price}</span>
                      </div>
                    </div>
                    <div className="quantity-modifier-btn-container">
                      <button
                        type="button"
                        data-testid="decrement-quantity"
                        onClick={() => this.handleCartItemDecrement(product)}
                      >
                        -
                      </button>
                      <span data-testid="item-quantity">{product.count}</span>
                      <button
                        type="button"
                        data-testid="increment-quantity"
                        onClick={() => this.handleCartItemIncrement(product)}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total-price-with-checkout-btn-container">
                <span data-testid="total-price">{`Total (${tempArr.length} items) : Rs ${totalPrice}`}</span>
                <button
                  type="button"
                  className="checkout-btn"
                  onClick={this.handleCheckoutBtn}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    )
  }
}

export default Cart
