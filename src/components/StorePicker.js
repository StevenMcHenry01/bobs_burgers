import React from 'react'
import { getFunName } from '../helpers.js'
import PropTypes from 'prop-types'

class StorePicker extends React.Component {
  myInput = React.createRef()
  static propTypes = {
    history: PropTypes.object,
  }
  goToStore = event => {
    // stop form from submitting
    event.preventDefault()
    // get text from input
    const storeNameRef = this.myInput.current.value
    // change page to store
    this.props.history.push(`/store/${storeNameRef}`)
  }
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter the name of your burger joint!</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker
