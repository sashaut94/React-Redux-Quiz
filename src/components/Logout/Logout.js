import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../store/actions/auth";

class Logout extends Component {
  render() {
    return <Redirect to='/'/>
  }

  componentDidMount() {
    this.props.logout()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)