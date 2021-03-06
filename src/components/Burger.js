import React from 'react'
import { formatPrice } from '../helpers'
import PropTypes from 'prop-types'

class Burger extends React.Component {
  static propTypes = {
    index: PropTypes.string.isRequired,
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string.isRequired,
      price: PropTypes.number,
    }),
    addToOrder: PropTypes.func,
  }
  handleClick = () => {
    this.props.addToOrder(this.props.index)
  }
  render() {
    const { image, name, desc, status, price } = this.props.details
    const isAvailable = status === 'available'
    return (
      <li className="menu-burger">
        <img src={image} alt={name} />
        <h3 className="burger-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>
          {isAvailable ? 'Add To Order' : 'Sold Out!'}
        </button>
      </li>
    )
  }
}

export default Burger
