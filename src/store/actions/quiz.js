import axios from "axios";
import {
  CLEAR_QUIZ,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FINISHED_QUIZ,
  NEXT_QUESTION,
  SET_ANSWER_STATE
} from "./actionTypes";

export function fetchQuizzes() {
  return async dispatch => {
    dispatch(fetchQuizzesStart())
    try {
      const response = await axios.get('https://react-quiz-eb890-default-rtdb.firebaseio.com/quizes/.json')
      const quizzes = response.data
      dispatch(fetchQuizzesSuccess(quizzes))
    } catch (e) {
      dispatch(fetchQuizzesError(e))
    }
  }
}

export function fetchQuizzesStart() {
  return {
    type: FETCH_QUIZZES_START
  }
}

export function fetchQuizzesSuccess(quizzes) {
  return {
    type: FETCH_QUIZZES_SUCCESS,
    payload: quizzes
  }
}

export function fetchQuizzesError(e) {
  return {
    type: FETCH_QUIZZES_ERROR,
    payload: e
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: quiz
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizzesStart())
    try {
      const response = await axios.get(`https://react-quiz-eb890-default-rtdb.firebaseio.com/quizes/${quizId}.json`)
      const quiz = response.data
      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizzesError(e))
    }
  }
}

export function setAnswerState(results, answerState) {
  return {
    type: SET_ANSWER_STATE,
    results,
    answerState
  }
}

export function finishedQuiz() {
  return {
    type: FINISHED_QUIZ
  }
}

export function nextQuestion(number) {
  return {
    type: NEXT_QUESTION,
    number
  }
}

export function clearQuiz() {
  return {
    type: CLEAR_QUIZ
  }
}

export function onAnswerStateHandler(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }
    const question = state.quiz.questions[state.currentQuestion]
    const results = {...state.results}

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      dispatch(setAnswerState(results, {[answerId]: 'success'}))
      if (state.currentQuestion < state.quiz.questions.length - 1) {
        const timeout = setTimeout(() => {
          dispatch(nextQuestion(state.currentQuestion + 1))
          clearTimeout(timeout)
        }, 1500)
      } else {
        const timeout = setTimeout(() => {
          dispatch(finishedQuiz())
          clearTimeout(timeout)
        }, 1500)
      }
    } else {
      results[question.id] = 'error';
      dispatch(setAnswerState(results, {[answerId]: 'error'}))
    }
  }
}