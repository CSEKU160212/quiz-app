import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Form, FormGroup, Spinner } from "react-bootstrap";

import { home } from "../../../constants/appRoutePaths";
import { loginFormValidation } from "../../../utils/formValidations";
import {
  loginUser,
  removeLoginErrorMessage,
  useAuthDispatch,
  useAuthState,
} from "../../../context";
import AlertMessage from "../../components/AlertMessage";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});

  const { loading, errorMessage } = useAuthState();

  const history = useHistory();
  const dispatch = useAuthDispatch();

  const toggleShowPassword = (e) => {
    setShowPassword(e.target.checked);
  };

  const inputOnChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (!!formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }

    errorMessage && removeLoginErrorMessage(dispatch);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    errorMessage && removeLoginErrorMessage(dispatch);
    const validationErrors = loginFormValidation(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
    } else {
      let user = loginUser(dispatch, formValues);
      if (!user) return;
      history.push(home.path);
    }
  };

  return (
    <>
      <Card className="m-5" style={{ border: "none" }}>
        <Card.Body>
          <h5 className="text-center mb-3 text-primary">LOGIN</h5>
          <AlertMessage variant="danger" message={errorMessage}/>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                size="sm"
                placeholder="Enter email"
                isInvalid={!!formErrors?.email}
                onChange={(e) => inputOnChangeHandler(e)}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors?.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                size="sm"
                placeholder="Password"
                isInvalid={!!formErrors?.password}
                onChange={(e) => inputOnChangeHandler(e)}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors?.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Show password"
              onClick={(e) => toggleShowPassword(e)}
              className="mb-3"
            />

            <FormGroup controlId="loginButton" className="text-center">
              <Button
                variant="outline-primary"
                type="submit"
                onClick={formSubmitHandler}
              >
                <div className="px-2">
                  {loading && (
                    <Spinner
                      animation="grow"
                      variant="dark"
                      size="sm"
                      as="span"
                    />
                  )}
                  <span className="mx-2">Login</span>
                </div>
              </Button>
            </FormGroup>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default LoginForm;
