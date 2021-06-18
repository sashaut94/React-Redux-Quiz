import {
  ADD_QUESTION,
  ADD_TITLE,
  CLEAR_QUIZ_CREATION
} from "../actions/actionTypes";

const initialState = {
  title: '',
  questions: []
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state, questions: [...state.questions, action.question]
      }
    case ADD_TITLE:
      return {
        ...state, title: action.title
      }
    case CLEAR_QUIZ_CREATION:
      return {
        ...state, title: '', questions: []
      }
    default:
      return state
  }
}