
import React from 'react';
import { Link } from 'react-router-dom'

function Register() {
    return (
      <div className='auth root__section'>
        <h2 className='auth__title'>Регистрация</h2>
        <form className='auth__form'>
            <input className="auth__input auth__input_email" placeholder="Email"></input>
            <input className="auth__input auth__input_pass" placeholder="Пароль"></input>
            <button type="submit" className="auth__submit-button">Зарегистрироваться</button>
            <span className="auth__link">Уже зарегистрированы? <Link to="/sign-in"  className="auth__link-login">Войти</Link> </span>
            </form>
      </div>
    );
  }
  export default Register;