import React from 'react'
import firebase from 'firebase'
import AddBurger from './AddBurger'
import EditBurgerForm from './EditBurgerForm'
import PropTypes from 'prop-types'
import Login from './Login'
import base, { firebaseApp } from '../base'

class Inventory extends React.Component {
  static propTypes = {
    burgers: PropTypes.object.isRequired,
    updateBurger: PropTypes.func.isRequired,
    deleteBurger: PropTypes.func.isRequired,
    loadSampleBurgers: PropTypes.func.isRequired,
    storeID: PropTypes.string.isRequired,
  }
  state = {
    uid: null,
    owner: null,
  }
  // check if the user is already logged in
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }
  authHandler = async authData => {
    // look up currect store in firebase db
    const store = await base.fetch(this.props.storeID, { context: this })
    // claim it if there is owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeID}/owner`, {
        data: authData.user.uid,
      })
    }
    // set state to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    })
  }
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }
  logout = async () => {
    await firebase.auth().signOut()
    this.setState({ uid: null })
  }
  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>
    // check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }
    // check if they are the owner of the stor
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of this store</p>
          {logout}
        </div>
      )
    }
    // render the inventory of the owner
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.burgers).map(key => (
          <EditBurgerForm
            key={key}
            index={key}
            burger={this.props.burgers[key]}
            updateBurger={this.props.updateBurger}
            deleteBurger={this.props.deleteBurger}
          />
        ))}
        <AddBurger addBurger={this.props.addBurger} />
        <button onClick={this.props.loadSampleBurgers}>Load Sample Burgers</button>
      </div>
    )
  }
}

export default Inventory
