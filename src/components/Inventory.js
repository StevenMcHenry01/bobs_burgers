import React from 'react'
import AddBurger from './AddBurger'

class Inventory extends React.Component {
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <AddBurger addBurger={this.props.addBurger}/>
        <button onClick={this.props.loadSampleBurgers}>Load Sample Burgers</button>
      </div>
    )
  }
}

export default Inventory
