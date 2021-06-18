import React from 'react'
import classes from './Toggle.module.scss'

const Toggle = props => {
  const cls = [classes.Toggle, 'fas']
  cls.push(props.isOpen ? 'fa-times' : 'fa-bars')
  if (props.isOpen) cls.push(classes.open)
  return (
    <i
      className={cls.join(' ')}
      onClick={props.onClick}
    />
  )
}

export default Toggle