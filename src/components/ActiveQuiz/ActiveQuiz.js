import React from 'react'
import classes from './ActiveQuiz.module.scss'
import AnswersList from "./AnswersList/AnswersList"

const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <h3 className={classes.title}>Ответьте на все вопросы</h3>
      <div className={classes.wrapper}>
        <p className={classes.question}>
          <span className={classes.text}>{props.current + 1}.&nbsp;
            {props.questions[props.current].question}</span>
          <span className={classes.counter}>
            {props.current + 1} из {props.questions.length}
          </span>
        </p>
        <AnswersList
          answers={props.questions[props.current].answers}
          onAnswerClickHandler={props.onAnswerClickHandler}
          answerState={props.answerState}
        />
      </div>
    </div>
  )
}

export default ActiveQuiz