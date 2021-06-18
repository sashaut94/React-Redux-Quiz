import React from 'react'
import classes from './Input.module.scss'
import {isInvalid} from "../../../formFramework/formFramework"

const Input = props => {
  const cls = [classes.label]
  if (isInvalid(props)) cls.push(classes.invalid)

  const type = props.type || 'text'
  const htmlFor = `${type}-${Math.random()}`
  return (
    <div className={classes.Input}>
      <label
        className={cls.join(' ')}
        htmlFor={htmlFor}
      >
        {props.label}
      </label>

      <input
        value={props.value}
        className={classes.input}
        id={htmlFor}
        type={type}
        onChange={props.onChange}
      />

      {
        isInvalid(props)
          ? <span className={classes.errorMessage}>
        {props.errorMessage}
      </span>
          : null
      }
    </div>
  )
}

export default Input