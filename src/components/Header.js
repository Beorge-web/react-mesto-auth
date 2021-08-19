import { useLocation, Link } from "react-router-dom";
import logo from "../images/logo.svg";
function Header({ handleLogout }) {
  const path = useLocation();
  return (
    <header className='header root__section'>
      <img src={logo} alt='Место логотип' className='header__logo' />
      <h2 className='header__page-info'> {path.pathname === '/' ? 'Username ' : null}
        {path.pathname === "/sign-up" ? (
          <Link to='/sign-in' className='header__link'>
            Вход
          </Link>
        ) : path.pathname === "/sign-in" ? (
          <Link to='/sign-up' className='header__link'>
            Регистрация
          </Link>
        ) : 
          (
          <Link to='/sign-in' className='header__link' onClick={handleLogout}>
            Выйти
          </Link>)
        }
      </h2>
    </header>
  );
}
export default Header;
