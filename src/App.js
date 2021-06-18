import React, {Component} from 'react'
import Layout from "./hoc/Layout/Layout"
import Quiz from "./containers/Quiz/Quiz"
import {Redirect, Route, Switch} from 'react-router-dom'
import Auth from "./containers/Auth/Auth"
import QuizCreator from "./containers/QuizCreator/QuizCreator"
import QuizList from "./containers/QuizList/QuizList"
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' exact component={Auth}/>
        <Route path='/quizes/:id' component={Quiz}/>
        <Route path='/' exact component={QuizList}/>
        <Redirect to='/'/>
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator}/>
          <Route path='/quizes/:id' component={Quiz}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' exact component={QuizList}/>
          <Redirect to='/'/>
        </Switch>
      )
    }
    return (
      <Layout>
        {routes}
      </Layout>
    )
  }

  componentDidMount() {
    this.props.autoLogin()
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
