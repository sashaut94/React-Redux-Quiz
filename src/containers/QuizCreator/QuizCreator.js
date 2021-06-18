import React, {Component} from 'react'
import classes from './QuizCreator.module.scss'
import {
  createFormControls,
  createControl,
  validateControl,
  onInputChangeHandler
} from "../../formFramework/formFramework"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import Select from "../../components/UI/Select/Select"
import {connect} from "react-redux"
import {addQuestion, addQuiz} from "../../store/actions/create"

class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    titleControl: createControl({
      label: 'Придумайте название для теста',
      errorMessage: 'Название  не может быть пустым'
    }, {isRequired: true}),
    formControls: createFormControls()
  }

  addQuestion = () => {
    const {question, option1, option2, option3} = this.state.formControls
    const questionItem = {
      id: this.props.questions.length + 1,
      question: question.value,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {id: option1.id, text: option1.value},
        {id: option2.id, text: option2.value},
        {id: option3.id, text: option3.value}
      ]
    }
    this.props.addQuestion(questionItem)
    this.setState({
      formControls: createFormControls(),
      isFormValid: false,
      rightAnswerId: 1
    })
  }

  createTest = async () => {
    await this.props.addQuiz(this.state.titleControl.value)
    this.setState({
      formControls: createFormControls(),
      titleControl: createControl({
        label: 'Придумайте название для теста',
        errorMessage: 'Название  не может быть пустым'
      }, {isRequired: true}),
      isFormValid: false,
      rightAnswerId: 1,
    })
    this.props.history.push('/')
  }

  onTitleChangeHandler = (e) => {
    const titleControl = {...this.state.titleControl}
    titleControl.value = e.target.value
    titleControl.touched = true
    titleControl.valid = validateControl(e.target.value, titleControl.validation)
    this.setState({titleControl})
  }

  onSelectChangeHandler = (e) => {
    this.setState({rightAnswerId: +e.target.value})
  }

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return <Input
        key={index}
        value={control.value}
        label={control.label}
        errorMessage={control.errorMessage}
        shouldValidate={!!control.validation}
        valid={control.valid}
        touched={control.touched}
        onChange={onInputChangeHandler.bind(this, controlName)}
      />
    })
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Создайте свой тест</h1>
          <form className={classes.form}>
            <Input
              value={this.state.titleControl.value}
              label={this.state.titleControl.label}
              errorMessage={this.state.titleControl.errorMessage}
              shouldValidate={!!this.state.titleControl.validation}
              valid={this.state.titleControl.valid}
              touched={this.state.titleControl.touched}
              onChange={this.onTitleChangeHandler}
            />
            {this.renderControls()}
            <Select
              label='Выберете номер правильного ответа'
              name='rightAnswerId'
              value={this.state.rightAnswerId}
              onChange={this.onSelectChangeHandler}
            />
            <div className={classes.buttons}>
              <Button
                styles='success'
                disabled={!this.state.isFormValid}
                onClick={this.addQuestion}
              >
                Добавить вопрос
              </Button>
              <Button
                styles='primary'
                disabled={this.props.questions.length === 0}
                onClick={this.createTest}
              >
                Создать тест
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.create.title,
    questions: state.create.questions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: item => dispatch(addQuestion(item)),
    addQuiz: title => dispatch(addQuiz(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)