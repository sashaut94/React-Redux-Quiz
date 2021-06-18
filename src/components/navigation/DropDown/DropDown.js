import React from 'react'
import classes from './DropDown.module.scss'
import BackDrop from "../../UI/BackDrop/BackDrop"
import {NavLink} from "react-router-dom"
import {connect} from "react-redux";

function renderLinks(links, onClick) {
  return links.map((link, index) => {
    return <li
      key={index}
      className={classes.item}
      onClick={onClick}
    >
      <NavLink
        to={link.to}
        exact={link.exact}
        className={classes.link}
      >
        {link.text}
      </NavLink>
    </li>
  })
}

const DropDown = props => {
  const links = [
    {to: '/', text: 'Список тестов', exact: true}
  ]
  if (props.isAuthenticated) {
    links.push({to: '/quiz-creator', text: 'Создать свой тест', exact: false})
    links.push({to: '/logout', text: 'Выйти', exact: false})
  } else {
    links.push({to: '/auth', text: 'Авторизация', exact: false})
  }

  const cls = [classes.DropDown]
  if (props.isOpen) cls.push(classes.open)

  return (
    <>
      <nav className={cls.join(' ')}>
        <ul className={classes.list}>
          {renderLinks(links, props.onCloseMenuHandler)}
        </ul>
      </nav>
      {
        props.isOpen
          ? <BackDrop onCloseMenuHandler={props.onCloseMenuHandler}/>
          : null
      }
    </>
  )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(DropDown)