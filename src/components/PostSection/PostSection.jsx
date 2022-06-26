import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import Form from './Form/Form';
import SignupSuccess from '../UI/SignupSuccess/SignupSuccess';

import './PostSection.scss';

const PostSection = forwardRef((_, ref) => {
  //Reading the registration state to show success image conditionally
  const isRegistered = useSelector((state) => state.app.isRegistered);

  return (
    <section className="post" ref={ref}>
      {isRegistered && <SignupSuccess />}
      {!isRegistered && (
        <>
          <h1 className="post__title">Working with POST request</h1>
          <div className="post__form-wrapper">
            <Form />
          </div>
        </>
      )}
    </section>
  );
});

export default PostSection;
