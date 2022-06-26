import { useReducer } from 'react';

const INPUT_ACTIONS = {
  INPUT: 'INPUT',
  BLUR: 'BLUR',
  RESET: 'RESET',
};

const initialState = {
  value: '',
  isTouched: false,
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_ACTIONS.INPUT:
      return {
        value: action.value,
        isTouched: state.isTouched,
      };
    case INPUT_ACTIONS.BLUR:
      return {
        value: state.value,
        isTouched: true,
      };
    case INPUT_ACTIONS.RESET:
      return {
        value: '',
        isTouched: false,
      };
  }
};

export const useForm = (validateInput) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const inputHandler = (event) => {
    dispatch({ type: INPUT_ACTIONS.INPUT, value: event.target.value });
  };

  const blurHandler = () => {
    dispatch({ type: INPUT_ACTIONS.BLUR });
  };

  const reset = () => {
    dispatch({ type: INPUT_ACTIONS.RESET });
  };

  const inputIsValid = validateInput(inputState.value);
  const hasError = !inputIsValid && inputState.isTouched;

  return {
    value: inputState.value,
    isValid: inputIsValid,
    inputHandler,
    blurHandler,
    reset,
    hasError,
  };
};
