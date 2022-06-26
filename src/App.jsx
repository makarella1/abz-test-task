import { useRef } from 'react';

import { Container, Header, Main, PostSection } from './components';

const App = () => {
  const usersRef = useRef(null);
  const signupRef = useRef(null);

  const scrollToElement = (element) => {
    //Why do we need all these buttons if we click them and they do nothing? Gotta make them scroll to a certain element :)
    window.scrollTo({
      top: element.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <div className="app">
      <Header
        usersRef={usersRef}
        signupRef={signupRef}
        scrollToElement={scrollToElement}
      />
      <Container className="app__container">
        <Main ref={usersRef} />
        <PostSection ref={signupRef} />
      </Container>
    </div>
  );
};

export default App;
