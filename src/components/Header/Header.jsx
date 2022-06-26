import Navbar from './Navbar/Navbar';
import Button from '../UI/Button/Button';

import './Header.scss';

const Header = ({ usersRef, signupRef, scrollToElement }) => {
  return (
    <header className="header">
      <Navbar
        usersRef={usersRef}
        signupRef={signupRef}
        scrollToElement={scrollToElement}
      />
      <div className="header__content">
        <div className="header__content-block">
          <h1 className="header__title">
            Test assignment for front-end developer
          </h1>
          <p className="header__text">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <Button
            className="header__signup-btn"
            onClick={() => scrollToElement(signupRef)}
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
