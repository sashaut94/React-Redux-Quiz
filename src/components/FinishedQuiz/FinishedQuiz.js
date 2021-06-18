import React from 'react'
import classes from './FinishedQuiz.module.scss'
import Button from "../UI/Button/Button"
import {Link} from "react-router-dom"

const FinishedQuiz = props => {
  const successCounter = Object.keys(props.results).reduce((total, current) => {
    if (props.results[current] === 'success') total++
    return total
  }, 0)
  return (
    <div className={classes.FinishedQuiz}>
      <h3 className={classes.title}>
        Список Ваших ответов на тест
      </h3>
      <>
        <ul className={classes.list}>
          {
            Object.keys(props.results).map((result, index) => {
              const cls = [classes.icon, 'fas']
              cls.push(props.results[result] === 'success' ? 'fa-check' : 'fa-times')
              cls.push(classes[props.results[result]])
              return <li
                key={index}
                className={classes.item}>
                <span className={classes.question}>  {index + 1}.&nbsp;
                  {props.questions[index].question}</span>
                <i className={cls.join(' ')}/>
              </li>
            })
          }
        </ul>
        <p className={classes.counter}>Правильно {successCounter} из {props.questions.length}</p>
        <div className={classes.buttons}>
          <Button
            onClick={props.onClick}
            styles='success'
          >
            Пройти тест еще раз
          </Button>
          <Link to='/'>
            <Button
              styles='primary'
            >
              Перейти к списку тестов
            </Button>
          </Link>
        </div>
      </>
    </div>
  )
}

export default FinishedQuiz