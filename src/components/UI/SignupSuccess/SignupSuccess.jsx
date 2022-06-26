import success from '../../../images/signup/signup-success.png';

import './SignupSuccess.scss';

const SignupSuccess = () => {
  return (
    <div className="success">
      <img className="success__img" src={success} alt="Success" />
    </div>
  );
};

export default SignupSuccess;
