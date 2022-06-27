import {
  loginFormErrors,
  questionValidationErrors,
} from "../constants/formValidationErrors";

export const loginFormValidation = (formValues) => {
  const { email, password } = formValues;
  const errors = {};

  if (!email || email === "") {
    errors.email = loginFormErrors.emailRequired;
  } else {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      errors.email = loginFormErrors.emailInvalid;
    }
  }

  if (!password || password === "") {
    errors.password = loginFormErrors.passwordRequired;
  }

  return errors;
};

export const questionValidation = (item) => {
  const errors = {};
  if (!item?.question || item.question === "") {
    errors.question = questionValidationErrors.questionRequired;
  }
  if (item?.options.length < 4) {
    errors.options = questionValidationErrors.optionsRequired;
  }

  item?.options.forEach((item) => {
    if (!item || item === "") {
      errors.options = questionValidationErrors.optionsRequired;
    }
  });

  if (!item?.answer || item?.answer === "") {
    errors.answer = questionValidationErrors.answerRequired;
  }
  return errors;
};
