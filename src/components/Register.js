import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [emailValue, setEmailValue] = React.useState('');
  const [passValue, setPassValue] = React.useState('');
  function handleEmailChange(e) {
    setEmailValue(e.target.value);
  }
  function handlePassChange(e) {
    setPassValue(e.target.value);
  }
  function handleSubmit(e){
    e.preventDefault();
    console.log(emailValue + ' ' + passValue)
    props.onSignUp({
      email: emailValue,
      password: passValue,
    });
  }
  return (
    <div className='auth root__section'>
      <h2 className='auth__title'>Регистрация</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input
          type="email"
          className='auth__input auth__input_email'
          placeholder='Email'
          value={emailValue}
          onChange={handleEmailChange}
          required
        ></input>
        <input
          type="password"
          className='auth__input auth__input_pass'
          placeholder='Пароль'
          value={passValue}
          onChange={handlePassChange}
          required
        ></input>
        <button type='submit' className='auth__submit-button'>
          Зарегистрироваться
        </button>
        <span className='auth__link'>
          Уже зарегистрированы?{" "}
          <Link to='/sign-in' className='auth__link-login'>
            Войти
          </Link>{" "}
        </span>
      </form>
    </div>
  );
}
export default Register;
