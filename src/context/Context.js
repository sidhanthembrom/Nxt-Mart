import React from 'react'

const NxtMartContext = React.createContext({
  cartList: [],
  handleIncrementInCart: () => {},
  handleDecrementInCart: () => {},
  addItemInCart: () => {},
})

export default NxtMartContext
