import React from 'react'
import PropTypes from 'prop-types'

class EditBurgerForm extends React.Component {
  static propTypes = {
    burger: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string.isRequired,
      price: PropTypes.number
    }),
    updateBurger: PropTypes.func,
    deleteBurger: PropTypes.func
  }
  handleChange = event => {
    //take copy of current burger
    const updatedBurger = {
      ...this.props.burger,
      [event.currentTarget.name]: event.currentTarget.value
    }
    // update burger
    this.props.updateBurger(this.props.index, updatedBurger)
  }
  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.burger.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.burger.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.burger.status}
        >
          <option value="available">In Stock</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={this.props.burger.desc} />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.burger.image}
        />
        <button onClick={() => this.props.deleteBurger(this.props.index)}>Remove Burger</button>
      </div>
    )
  }
}

export default EditBurgerForm
