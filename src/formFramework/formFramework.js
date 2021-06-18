import is from 'is_js'

export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ''
  }
}

export function createOptionControl(number) {
  return createControl({
    label: `Вариант №${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number
  }, {isRequired: true})
}

export function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {isRequired: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3)
  }
}

export function isInvalid({valid, touched, shouldValidate}) {
  return !valid && touched && shouldValidate
}

export function validateControl(value, validation) {
  if (!validation) return true
  let isValid = true
  if (validation.isRequired) {
    isValid = value.trim() !== '' && isValid
  }
  if (validation.isEmail) {
    isValid = is.email(value) && isValid
  }
  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid
  }
  return isValid
}

export function validateForm(formControls) {
  let isFormValid = true
  Object.keys(formControls).forEach((control) => {
    isFormValid = formControls[control].valid && isFormValid
  })
  return isFormValid
}

export function onInputChangeHandler(controlName, e) {
  const formControls = {...this.state.formControls}
  const control = formControls[controlName]
  control.value = e.target.value
  control.touched = true
  control.valid = validateControl(e.target.value, control.validation)
  formControls[controlName] = control
  const isFormValid = validateForm(formControls)
  this.setState({formControls, isFormValid})
}