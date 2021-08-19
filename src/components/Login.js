function Login({handleLogin}) {
    return (
      <div className='auth root__section'>
        <h2 className='auth__title'>Вход</h2>
        <form className='auth__form' onSubmit={handleLogin}>
            <input className="auth__input auth__input_email" placeholder="Email"></input>
            <input className="auth__input auth__input_pass" placeholder="Пароль"></input>
            <button type="submit" className="auth__submit-button">Войти</button>
            </form>
      </div>
    );
  }
  export default Login;