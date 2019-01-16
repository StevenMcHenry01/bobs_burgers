import React from 'react'

class AddBurger extends React.Component {
  nameRef = React.createRef()
  priceRef = React.createRef()
  statusRef = React.createRef()
  descRef = React.createRef()
  imageRef = React.createRef()

  createBurger = event => {
    event.preventDefault();
    const burger = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    }
    this.props.addBurger(burger)
    // clear form
    event.currentTarget.reset()
  }
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createBurger}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input name="price" ref={this.priceRef} type="text" placeholder="Price" />
        <select name="status" ref={this.statusRef}>
          <option value="available">In Stock!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
        <button type="submit">+ Add Burger</button>
      </form>
    )
  }
}

export default AddBurger
