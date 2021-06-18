import React from 'react'
import classes from './Button.module.scss'

const Button = props => {
  const type = props.type || 'button'
  const disabled = props.disabled || false
  const cls = [classes.Button]
  if (props.styles) cls.push(classes[props.styles])
  return (
    <button
      className={cls.join(' ')}
      onClick={props.onClick}
      disabled={disabled}
      type={type}
    >
      {props.children}
    </button>
  )
}

export default Button