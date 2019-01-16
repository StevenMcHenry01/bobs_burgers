import React from "react"
import Header from "./Header"
import Inventory from "./Inventory"
import Order from "./Order"
import sampleBurgers from "../sample-burgers"
import Burger from "./Burger"

class App extends React.Component {
  state = {
    burgers: {},
    order: {}
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
  loadSampleBurgers = () => {
    this.setState({ burgers: sampleBurgers })
  }
  addToOrder = key => {
    // take copy of state
    const order = {...this.state.order}
    // either add to order or update number in order
    order[key] = order[key] + 1 || 1
    // call setState to update our state object
    this.setState({ order })
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="wowzers" />
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
        <Order burgers={this.state.burgers} order={this.state.order} />
        <Inventory addBurger={this.addBurger} loadSampleBurgers={this.loadSampleBurgers} />
      </div>
    )
  }
}

export default App;