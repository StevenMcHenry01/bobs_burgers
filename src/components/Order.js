import React from 'react'
import { formatPrice } from '../helpers'

class Order extends React.Component {
  renderOrder = key => {
    const { burgers, order } = this.props
    const burger = burgers[key]
    const count = order[key]
    if (!(burger.status === 'available')) {
      return <li key={key}>
        Sorry the {burger ? burger.name : 'burger'} is no longer available
      </li>
    }
    return <li key={key}>
      {count} {burger.name}
      {formatPrice(count * burger.price)}
    </li>
  }
  render() {
    const { burgers, order } = this.props
    const orderIds = Object.keys(order)
    const total = orderIds.reduce((prevTotal, key) => {
      const burger = burgers[key]
      const count = order[key]
      const isAvailable = burger && burger.status === 'available'
      if(isAvailable) {
        return prevTotal + (count * burger.price)
      }
      return prevTotal
    }, 0)
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
        </ul>
        <div className="total">
          <strong>Total: {formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order