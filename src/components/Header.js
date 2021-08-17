import logo from "../images/logo.svg";
function Header() {
  return (
    <header className='header root__section'>
      <img src={logo} alt='Место логотип' className='header__logo' />
    </header>
  );
}
export default Header;
