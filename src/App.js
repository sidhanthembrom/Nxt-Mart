import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoute from './ProtectedRoute'
import NxtMartContext from './context/Context'

import './App.css'

class App extends Component {
  state = {cartList: []}

  handleIncrementInCart = product => {
    const {cartList} = this.state
    const tempArr = cartList.map(obj =>
      obj.id === product.id ? {...obj, count: obj.count + 1} : obj,
    )
    this.setState({cartList: tempArr})
  }

  handleDecrementInCart = (product, count) => {
    const {cartList} = this.state
    if (count === 1) {
      const tempArr = cartList.filter(obj => obj.id !== product.id)
      this.setState({cartList: tempArr})
    } else {
      const tempArr = cartList.map(obj =>
        obj.id === product.id ? {...obj, count: obj.count - 1} : obj,
      )
      this.setState({cartList: tempArr})
    }
  }

  addItemInCart = product => {
    const {cartList} = this.state
    const tempArr = [...cartList, product]
    this.setState({cartList: tempArr})
  }

  render() {
    const {cartList} = this.state

    console.log(cartList)

    return (
      <NxtMartContext.Provider
        value={{
          cartList,
          handleDecrementInCart: this.handleDecrementInCart,
          handleIncrementInCart: this.handleIncrementInCart,
          addItemInCart: this.addItemInCart,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </NxtMartContext.Provider>
    )
  }
}

export default App
