import React, {Component} from 'react'
import classes from './Auth.module.scss'
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import {createControl, onInputChangeHandler} from "../../formFramework/formFramework"
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: createControl({
        type: 'email',
        errorMessage: 'Введите корректный email',
        label: 'Введите email'
      }, {
        isRequired: true,
        isEmail: true
      }),
      password: createControl({
        type: 'password',
        errorMessage: 'Введите корректный пароль',
        label: 'Введите пароль'
      }, {
        isRequired: true,
        minLength: 6
      }),
    }
  }

  onSignUpHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  }

  onSignInHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Авторизация</h1>
          <form className={classes.form}>
            {
              Object.keys(this.state.formControls).map((controlName, index) => {
                const control = this.state.formControls[controlName]
                return <Input
                  key={index}
                  type={control.type}
                  errorMessage={control.errorMessage}
                  label={control.label}
                  valid={control.valid}
                  touched={control.touched}
                  value={control.value}
                  shouldValidate={!!control.validation}
                  onChange={onInputChangeHandler.bind(this, controlName)}
                />
              })
            }
            <div className={classes.buttons}>
              <Button
                disabled={!this.state.isFormValid}
                styles='success'
                onClick={this.onSignInHandler}
              >Войти
              </Button>
              <Button
                disabled={!this.state.isFormValid}
                styles='primary'
                onClick={this.onSignUpHandler}
              >Зарегестрироваться
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)