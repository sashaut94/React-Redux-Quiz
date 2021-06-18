import React, {Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz"
import Loader from "../../components/UI/Loader/Loader"
import {connect} from "react-redux";
import {clearQuiz, fetchQuizById, onAnswerStateHandler} from "../../store/actions/quiz";

class Quiz extends Component {
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>{this.props.quiz.title}</h1>
          {
            this.props.loading || Object.keys(this.props.quiz).length === 0
              ? <Loader/>
              : this.props.isFinished
              ? <FinishedQuiz
                onClick={this.props.clearQuiz}
                results={this.props.results}
                questions={this.props.quiz.questions}
              />
              : <ActiveQuiz
                questions={this.props.quiz.questions}
                current={this.props.currentQuestion}
                onAnswerClickHandler={this.props.onAnswerStateHandler}
                answerState={this.props.answerState}
              />
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.clearQuiz()
  }
}

function mapStateToProps(state) {
  return {
    loading: state.quiz.loading,
    error: state.quiz.error,
    answerState: state.quiz.answerState,
    currentQuestion: state.quiz.currentQuestion,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    quiz: state.quiz.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: quizId => dispatch(fetchQuizById(quizId)),
    onAnswerStateHandler: answerId => dispatch(onAnswerStateHandler(answerId)),
    clearQuiz: () => dispatch(clearQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)