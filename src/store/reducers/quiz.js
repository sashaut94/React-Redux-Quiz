import {
  CLEAR_QUIZ,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FINISHED_QUIZ,
  NEXT_QUESTION,
  SET_ANSWER_STATE
} from "../actions/actionTypes";

const initialState = {
  quizzes: [],
  loading: false,
  error: null,
  answerState: {},
  currentQuestion: 0,
  isFinished: false,
  results: {},
  quiz: {}
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZZES_START:
      return {
        ...state, loading: true
      }
    case FETCH_QUIZZES_SUCCESS:
      return {
        ...state, loading: false, quizzes: action.payload
      }
    case FETCH_QUIZZES_ERROR:
      return {
        ...state, loading: false, error: action.payload
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state, loading: false, quiz: action.payload
      }
    case SET_ANSWER_STATE: {
      return {
        ...state, results: action.results, answerState: action.answerState
      }
    }
    case FINISHED_QUIZ: {
      return {
        ...state, isFinished: true
      }
    }
    case NEXT_QUESTION: {
      return {
        ...state, currentQuestion: action.number, answerState: {}
      }
    }
    case CLEAR_QUIZ: {
      return {
        ...state, answerState: {}, currentQuestion: 0, isFinished: false, results: {},
      }
    }
    default:
      return state
  }
}