import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleBurgers from '../sample-burgers'
import Burger from './Burger'
import base from '../base'

class App extends React.Component {
  state = {
    burgers: {},
    order: {},
    storeName: '',
  }
  static propTypes = {
    match: PropTypes.object,
  }
  //
  // Lifecycle methods
  //
  componentDidMount() {
    const params = this.props.match.params
    // reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeID)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    // set store name
    this.setState({
      storeName: params.storeID,
    })
    // create variable for specific store name that was loaded
    this.ref = base.syncState(`${params.storeID}/burgers`, {
      context: this,
      state: 'burgers',
    })
  }
  componentDidUpdate() {
    // store order object in local storage. Much persistence
    localStorage.setItem(this.props.match.params.storeID, JSON.stringify(this.state.order))
  }
  componentWillUnmount() {
    // clean up for memory leaks
    base.removeBinding(this.ref)
  }
  addBurger = burger => {
    // take copy of existing state
    const burgers = { ...this.state.burgers }
    // add new burger to burgers var
    // Date.now is to uniqely identify burgs
    burgers[`burger${Date.now()}`] = burger
    // set state
    this.setState({ burgers })
  }
  updateBurger = (key, updatedBurger) => {
    //take copy of current state
    const burgers = { ...this.state.burgers }
    //update state
    burgers[key] = updatedBurger
    //set that to state
    this.setState({ burgers })
  }
  deleteBurger = key => {
    // take copy of state
    const burgers = { ...this.state.burgers }
    // update state (setting to null so firebase updates as well)
    burgers[key] = null
    // set state
    this.setState({ burgers })
  }
  loadSampleBurgers = () => {
    this.setState({ burgers: sampleBurgers })
  }
  addToOrder = key => {
    // take copy of state
    const order = { ...this.state.order }
    // either add to order or update number in order
    order[key] = order[key] + 1 || 1
    // call setState to update our state object
    this.setState({ order })
  }
  removeFromOrder = key => {
    // take copy of state
    const order = { ...this.state.order }
    // delete specific order
    if (order[key] > 1) {
      order[key]--
    } else {
      delete order[key]
    }
    // call setState to update our state object
    this.setState({ order })
  }
  render() {
    return (
      <div className="bobs-burgers">
        <div className="menu">
          <Header name={this.state.storeName} tagline="Bob's Burgers affiliate" />
          <ul className="fishes">
            {Object.keys(this.state.burgers).map(key => (
              <Burger
                key={key}
                index={key}
                details={this.state.burgers[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          burgers={this.state.burgers}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addBurger={this.addBurger}
          updateBurger={this.updateBurger}
          deleteBurger={this.deleteBurger}
          loadSampleBurgers={this.loadSampleBurgers}
          burgers={this.state.burgers}
          storeID={this.props.match.params.storeID}
        />
      </div>
    )
  }
}

export default App
