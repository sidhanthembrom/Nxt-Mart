import {Component} from 'react'
import NxtMartContext from '../../context/Context'
import './card.css'

class Card extends Component {
  state = {isClicked: false, count: 1}

  render() {
    const {product} = this.props
    const {isClicked, count} = this.state

    return (
      <NxtMartContext.Consumer>
        {value => {
          const {
            addItemInCart,
            handleIncrementInCart,
            handleDecrementInCart,
          } = value

          const handleAddBtn = product => {
            product.count = count
            addItemInCart(product)
            this.setState(prevState => ({isClicked: !prevState.isClicked}))
          }

          const handleDecrement = product => {
            const {count} = this.state
            if (count === 1) {
              handleDecrementInCart(product, count)
              this.setState({isClicked: false})
            } else if (count > 1) {
              handleDecrementInCart(product, count)
              this.setState(prevState => ({
                count: prevState.count - 1,
              }))
            }
          }

          const handleIncrement = product => {
            handleIncrementInCart(product)
            this.setState(prevState => ({count: prevState.count + 1}))
          }

          return (
            <div data-testid="product" className="card-container">
              <div className="card-img-container">
                <img
                  className="product-img"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="text-container">
                <div className="left-side">
                  <span>{product.name}</span>
                  <span className="quantity">{product.weight}</span>
                  <span className="price">{product.price}</span>
                </div>
                <div data-testid="add-button" className="right-side">
                  {isClicked ? (
                    <div className="quantity-modifier-btn-container">
                      <button
                        data-testid="decrement-count"
                        onClick={() => handleDecrement(product)}
                      >
                        -
                      </button>
                      <span data-testid="active-count">{count}</span>
                      <button
                        data-testid="increment-count"
                        onClick={() => handleIncrement(product)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="add-btn"
                      onClick={() => handleAddBtn(product)}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </NxtMartContext.Consumer>
    )
  }
}

export default Card
