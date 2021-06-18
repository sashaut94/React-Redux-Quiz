import {
  ADD_QUESTION,
  ADD_TITLE,
  CLEAR_QUIZ_CREATION
} from "./actionTypes";
import axios from 'axios'

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function addTitle(title) {
  return {
    type: ADD_TITLE,
    title
  }
}

export function addQuiz(title) {
  return async (dispatch, getState) => {
    try {
      await dispatch(addTitle(title))
      const quiz = {
        title: getState().create.title,
        questions: getState().create.questions
      }
      await axios.post('https://react-quiz-eb890-default-rtdb.firebaseio.com/quizes.json', quiz)
      dispatch(clearQuizCreation())
    } catch (e) {
      console.log(e)
    }
  }
}

export function clearQuizCreation() {
  return {
    type: CLEAR_QUIZ_CREATION
  }
}
