import React from 'react'
import classes from './AnswersList.module.scss'
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => {
  return (
    <ul className={classes.AnswersList}>
      {
        props.answers.map((answer, index) => {
          return <AnswerItem
            key={index}
            text={answer.text}
            id={answer.id}
            onAnswerClickHandler={props.onAnswerClickHandler}
            answerState={
              props.answerState[answer.id]
                ? props.answerState[answer.id]
                : null
            }
          />
        })
      }
    </ul>
  )
}

export default AnswersList