import Button from '../../UI/Button/Button';
import Container from '../../Layout/Container';

import './Navbar.scss';

import logo from '../../../images/logo.svg';

const Navbar = ({ usersRef, signupRef, scrollToElement }) => {
  return (
    <nav className="nav">
      <Container className="nav__container">
        <div className="nav__logo">
          <img className="nav__logo-img" src={logo} alt="Logo" />
        </div>
        <div className="nav__actions">
          <Button
            className="nav__users-btn"
            onClick={() => scrollToElement(usersRef)}
          >
            Users
          </Button>
          <Button
            className="nav__signup-btn"
            onClick={() => scrollToElement(signupRef)}
          >
            Sign up
          </Button>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
