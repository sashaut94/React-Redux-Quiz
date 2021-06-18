import React, {Component} from 'react'
import classes from './Layout.module.scss'
import Toggle from "../../components/navigation/Toggle/Toggle";
import DropDown from "../../components/navigation/DropDown/DropDown";

export default class Layout extends Component {
  state = {
    menu: false
  }

  onToggleHandler = () => {
    this.setState({menu: !this.state.menu})
  }

  onCloseMenuHandler = () => {
    this.setState({menu: false})
  }

  render() {
    return (
      <div className={classes.Layout}>
        <Toggle
          onClick={this.onToggleHandler}
          isOpen={this.state.menu}
        />
        <DropDown
          isOpen={this.state.menu}
          onCloseMenuHandler={this.onCloseMenuHandler}
        />
        <main className={classes.main}>
          {this.props.children}
        </main>
      </div>
    )
  }
}
