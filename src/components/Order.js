import React from 'react'
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

class Order extends React.Component {
  static propTypes = {
    burgers: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }
  renderOrder = key => {
    const { burgers, order } = this.props
    const burger = burgers[key]
    const count = order[key]
    const isAvailable = burger && burger.status === 'available'
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 }
    }
    // first check if there is burger in order (Prevents local storage bug)
    if (!burger) return null
    // display burger in order
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>Sorry the {burger ? burger.name : 'burger'} is no longer available</li>
        </CSSTransition>
      )
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            {burger.name}
            {formatPrice(count * burger.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>⊗</button>
          </span>
        </li>
      </CSSTransition>
    )
  }
  render() {
    const { burgers, order } = this.props
    const orderIds = Object.keys(order)
    const total = orderIds.reduce((prevTotal, key) => {
      const burger = burgers[key]
      const count = order[key]
      const isAvailable = burger && burger.status === 'available'
      if (isAvailable) {
        return prevTotal + count * burger.price
      }
      return prevTotal
    }, 0)
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          <strong>Total: {formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order
