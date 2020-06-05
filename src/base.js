import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBltZt-HH7Mdxiq8dCUrWLKdemhHRzvgW8',
  authDomain: 'bobs-burgers-menu.firebaseapp.com',
  databaseURL: 'https://bobs-burgers-menu.firebaseio.com'
})

const base = Rebase.createClass(firebaseApp.database())

// named export
export { firebaseApp }

// default export
export default base
