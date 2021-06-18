import React from 'react'
import classes from './Select.module.scss'

const options = [
  {text: 1, value: 1},
  {text: 2, value: 2},
  {text: 3, value: 3}
]

const Select = props => {
  const htmlFor = `select-${Math.random()}`
  return (
    <div className={classes.Select}>
      <label
        className={classes.label}
        htmlFor={htmlFor}
      >
        {props.label}
      </label>
      <select
        className={classes.select}
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        id={htmlFor}>
        {options.map((option, index) => {
          return <option
            key={index}
            value={option.value}>
            {option.text}
          </option>
        })}
      </select>
    </div>

  )
}

export default Select
