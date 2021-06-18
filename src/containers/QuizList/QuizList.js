import React, {Component} from 'react'
import classes from './QuizList.module.scss'
import {Link} from "react-router-dom"
import Loader from "../../components/UI/Loader/Loader"
import Button from "../../components/UI/Button/Button"
import {connect} from "react-redux";
import {fetchQuizzes} from "../../store/actions/quiz"

class QuizList extends Component {
  render() {
    return (
      <div className={classes.QuizList}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Список тестов</h1>
          {
            this.props.loading
              ? <Loader/>
              : Object.keys(this.props.quizzes).length !== 0
              ? <ul className={classes.list}>
                {
                  Object.keys(this.props.quizzes).map((key, index) => {
                    const quiz = this.props.quizzes[key]
                    return <li
                      className={classes.item}
                      key={index}
                    >
                      <Link
                        className={classes.link}
                        to={'/quizes/' + key}
                      >
                        {quiz.title}
                      </Link>
                    </li>
                  })
                }
              </ul>
              : <div className={classes.noTests}>
                <h3 className={classes.message}>На сервере отсутствуют тесты, пожалуйста, создайте свой</h3>
                <Link to='/quiz-creator'>
                  <Button
                    styles='primary'
                  >
                    Перейти к созданию теста
                  </Button>
                </Link>
              </div>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchQuizzes()
  }
}

function mapStateToProps(state) {
  return {
    quizzes: state.quiz.quizzes,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizzes: () => dispatch(fetchQuizzes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)