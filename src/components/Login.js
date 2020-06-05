import React from 'react'
import PropTypes from 'prop-types'

const Login = props => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign In to manage your store's Inventory</p>
    <button className="github" onClick={() => props.authenticate('Github')}>
      Log In with Github
    </button>
  </nav>
)

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
}

export default Login
