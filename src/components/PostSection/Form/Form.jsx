import { useState } from 'react';
import {
  useGetPositionsQuery,
  useRegisterUserMutation,
} from '../../../features/api/api';
import { useForm } from '../../../common/hooks/useForm';

import { useDispatch } from 'react-redux';
import { resetPages, setRegistration } from '../../../features/slices/appSlice';

import { phoneRegEx, emailRegEx, nameRegEx } from '../../../common/regs';

import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';

import './Form.scss';

const TOKEN_URL =
  'https://frontend-test-assignment-api.abz.agency/api/v1/token';

const Form = () => {
  const dispatch = useDispatch();

  const [label, setLabel] = useState('Upload your photo');
  const [hasFile, setHasFile] = useState(false);
  const [file, setFile] = useState(null);
  const [fileHasError, setFileHasError] = useState(false);

  const [positionId, setPositionId] = useState(1);

  //Getting registration state to render the content conditionally
  const [
    registerUser,
    {
      isLoading: userLoading,
      isSuccess: userRegistered,
      isError: registrationError,
    },
  ] = useRegisterUserMutation();

  //Using custom hook to valite all the inputs
  const {
    value: nameValue,
    isValid: nameIsValid,
    inputHandler: nameInputHandler,
    blurHandler: nameBlurHandler,
    reset: nameReset,
    hasError: nameHasError,
  } = useForm((value) => nameRegEx.test(value));

  const {
    value: emailValue,
    isValid: emailIsValid,
    inputHandler: emailInputHandler,
    blurHandler: emailBlurHandler,
    reset: emailReset,
    hasError: emailHasError,
  } = useForm((value) => emailRegEx.test(value));

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    inputHandler: phoneInputHandler,
    blurHandler: phoneBlurHandler,
    reset: phoneReset,
    hasError: phoneHasError,
  } = useForm((value) => phoneRegEx.test(value));

  const { data, isError, isSuccess, isLoading } = useGetPositionsQuery();

  let radioButtonsContent = null;

  const radioChangeHandler = (event) => {
    setPositionId(event.target.value);
  };

  if (isLoading) {
    radioButtonsContent = <Loader />;
  } else if (isSuccess) {
    radioButtonsContent = data.positions.map((position) => {
      return (
        <p className="form__radio" key={position.id}>
          <input
            type="radio"
            name="radio-group"
            id={`radio-${position.id}`}
            value={position.id}
            {...(position.id === 1 && { defaultChecked: true })}
            {...(position.id === 1 && { required: true })} //Trick to make the first radio button checked and required
            onChange={radioChangeHandler}
          />
          <label htmlFor={`radio-${position.id}`}>{position.name}</label>
        </p>
      );
    });
  } else if (isError) {
    radioButtonsContent = (
      <>
        <p className="form__radio-error">
          Something went wrong when loading positions...
        </p>
        <p className="form__radio">
          <input
            type="radio"
            name="radio-group"
            id="user"
            value="-1"
            defaultChecked
            required
            onChange={radioChangeHandler}
          />
          <label htmlFor="user">User</label>
        </p>
      </>
    );
  }

  //Simple file validation
  const fileUploadHandler = (event) => {
    const file = event.target.files[0];
    const fileName = file?.name;
    const label =
      fileName?.length > 20 ? `${fileName.substring(0, 20)}...` : fileName;

    if (
      file &&
      (file.type === 'image/jpeg' || file.type === 'image/jpg') &&
      file.size < 5000000
    ) {
      setHasFile(true);
      setFileHasError(false);

      setLabel(label);
      setFile(file);
    } else {
      setLabel(label);
      setFileHasError(true);
      return;
    }
  };

  const fileInputReset = () => {
    setFile(null);
    setLabel('Upload your photo');
    setHasFile(false);
  };

  const resetData = () => {
    fileInputReset();
    nameReset();
    emailReset();
    phoneReset();
  };

  const appendUserData = (userData) => {
    userData.append('name', nameValue);
    userData.append('email', emailValue);
    userData.append('phone', phoneValue);
    userData.append('position_id', positionId);
    userData.append('photo', file);
  };

  //Checking the validity of our form to enable or disable the submit button
  const formIsValid = nameIsValid && emailIsValid && phoneIsValid && file;

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      try {
        // We don't want to use RTK Query here to get a token simply because it pushes us to use a hook which we can't call inside of a function. Plain old fetch will suit better here.
        const response = await fetch(TOKEN_URL);

        if (response.ok) {
          const { token } = await response.json();

          const userData = new FormData();
          appendUserData(userData);

          const requestData = {
            token,
            userData,
          };
          registerUser(requestData);
        }
      } catch (error) {
        resetData();
        return;
      }
    }
  };

  if (userRegistered) {
    resetData();
    dispatch(resetPages());
    dispatch(setRegistration({ registered: true }));
  }

  return (
    <>
      {userLoading && <Loader className="form-loader" />}
      {registrationError && (
        <p className="form__signup-error">
          User wasn't registered. Try again later.
        </p>
      )}
      {!userLoading && !registrationError && (
        <form className="form" onSubmit={formSubmitHandler}>
          <div className="form__input-container">
            <input
              className={
                nameHasError ? 'form__input form__input_error' : 'form__input'
              }
              value={nameValue}
              onChange={nameInputHandler}
              onBlur={nameBlurHandler}
              id="name"
              type="text"
              placeholder=" "
              minLength="2"
              maxLength="60"
              required
            />
            <label
              className={
                nameHasError ? 'form__label form__label_error' : 'form__label'
              }
              htmlFor="name"
            >
              Your name
            </label>
            {nameHasError && (
              <p className="form__hint form__hint_error">
                Username should contain 2-60 characters
              </p>
            )}
          </div>
          <div className="form__input-container">
            <input
              className={
                emailHasError ? 'form__input form__input_error' : 'form__input'
              }
              value={emailValue}
              onChange={emailInputHandler}
              onBlur={emailBlurHandler}
              id="email"
              type="email"
              placeholder=" "
              minLength="2"
              maxLength="60"
              required
            />
            <label
              className={
                emailHasError ? 'form__label form__label_error' : 'form__label'
              }
              htmlFor="email"
            >
              Email
            </label>
            {emailHasError && (
              <p className="form__hint form__hint_error">
                Email must be in format "email@email.com"
              </p>
            )}
          </div>
          <div className="form__input-container">
            <input
              className={
                phoneHasError ? 'form__input form__input_error' : 'form__input'
              }
              value={phoneValue}
              onChange={phoneInputHandler}
              onBlur={phoneBlurHandler}
              id="phone"
              type="tel"
              placeholder=" "
              required
            />
            <label
              className={
                phoneHasError ? 'form__label form__label_error' : 'form__label'
              }
              htmlFor="phone"
            >
              Phone
            </label>
            {!phoneHasError && (
              <p className="form__hint">+38 (XXX) XXX - XX - XX</p>
            )}
            {phoneHasError && (
              <p className="form__hint form__hint_error">
                Number should start with code of Ukraine +380
              </p>
            )}
          </div>
          <p className="form__text">Select your position</p>
          <div className="form__radio-wrapper">{radioButtonsContent}</div>
          <div className="form__upload">
            <input
              className={
                fileHasError ? 'form__file form__file_error' : 'form__file'
              }
              type="file"
              id="file"
              accept="image/jpeg, image/jpg"
              onChange={fileUploadHandler}
              required
            />
            <label
              className={`${
                hasFile
                  ? 'form__file-label form__file-label_active'
                  : 'form__file-label'
              }`}
              style={fileHasError ? { borderColor: '#cb3d40' } : null} // Defining inline styles to reduce an overwhelming amount of classnames
              htmlFor="file"
            >
              {label}
            </label>
            {fileHasError && (
              <p className="form__hint form__hint_error">
                The photo size must not be greater than 5 Mb (jpeg/jpg type)
              </p>
            )}
          </div>
          <Button
            className={
              formIsValid ? 'form__submit-btn' : 'form__submit-btn btn_disabled'
            }
          >
            Sign up
          </Button>
        </form>
      )}
    </>
  );
};

export default Form;
