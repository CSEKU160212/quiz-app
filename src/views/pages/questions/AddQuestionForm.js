import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {
  addQuestion,
  removeAddMessage,
  removeErrorMessage,
  useQuizDispatch,
  useQuizState,
} from "../../../context";
import { formatQuestion } from "../../../utils";
import { questionValidation } from "../../../utils/formValidations";
import AlertMessage from "../../components/AlertMessage";

const AddQuestionForm = ({ quizId }) => {
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState({
    question: "",
    options: { optionA: "", optionB: "", optionC: "", optionD: "" },
    answer: "",
  });
  const [formErrors, setFormErrors] = useState(null);
  const { addMessage, errorMessage } = useQuizState();

  const dispatch = useQuizDispatch();

  const removeMessage = () => {
    removeErrorMessage(dispatch);
    removeAddMessage(dispatch);
  };

  const inputOnChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "question" || name === "answer") {
      const questionData = { ...question, [name]: value };
      setQuestion(questionData);
      formErrors &&
        formErrors[name] &&
        setFormErrors({ ...formErrors, [name]: "" });
    } else {
      const questionData = {
        ...question,
        options: { ...question.options, [name]: value },
      };
      setQuestion(questionData);
      formErrors &&
        formErrors.options &&
        setFormErrors({ ...formErrors, options: "" });
    }
    removeMessage();
  };

  const addHandler = () => {
    const newQuestion = formatQuestion(question);
    const questionValidationErrors = questionValidation(newQuestion);

    console.log(questionValidationErrors);

    if (Object.keys(questionValidationErrors).length > 0) {
      setFormErrors(questionValidationErrors);
    } else {
      addQuestion(dispatch, quizId, newQuestion);
    }
  };

  return (
    <>
      {!showForm ? (
        <div className="lg-m-3 sm-m-1 md-m-2" style={{ width: "fit-content" }}>
          <Button
            size="sm"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Add Question
          </Button>
        </div>
      ) : (
        <Card className="m-3" style={{ border: "none" }}>
          <Card.Body>
            <h5 className="text-center mb-3 text-primary">Add Question</h5>
            <AlertMessage variant="danger" message={errorMessage} />
            <AlertMessage variant="success" message={addMessage} />
            <Row>
              <Col sm={12} md={6} lg={4} className="mx-auto">
                <Form>
                  <Form.Group className="mb-3" controlId="question">
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                      type="text"
                      name="question"
                      size="sm"
                      placeholder="Enter Question"
                      isInvalid={!!formErrors?.question}
                      onChange={(e) => inputOnChangeHandler(e)}
                    />

                    <Form.Control.Feedback type="invalid">
                      {formErrors?.question}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Row>
                    {Object.keys(question.options).map((optionKey, index) => {
                      return (
                        <Col md={6} lg={6} sm={12} key={optionKey}>
                          <Form.Group className="mb-3" controlId={optionKey}>
                            <Form.Label>{`Option ${String.fromCharCode(
                              65 + index
                            )}:`}</Form.Label>
                            <Form.Control
                              type="text"
                              name={optionKey}
                              size="sm"
                              placeholder="Enter option"
                              isInvalid={
                                !question.options[`${optionKey}`] &&
                                formErrors?.options
                              }
                              onChange={(e) => inputOnChangeHandler(e)}
                            />

                            <Form.Control.Feedback type="invalid">
                              {!question.options[`${optionKey}`] &&
                              formErrors?.options
                                ? formErrors?.options
                                : ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      );
                    })}
                  </Row>
                  <Form.Group className="mb-3" controlId="answer">
                    <Form.Label>Answer</Form.Label>
                    <Form.Control
                      type="text"
                      name="answer"
                      size="sm"
                      placeholder="Enter Answer"
                      isInvalid={!!formErrors?.answer}
                      onChange={(e) => inputOnChangeHandler(e)}
                    />

                    <Form.Control.Feedback type="invalid">
                      {formErrors?.answer}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="text-center">
                    <Button
                      size="sm"
                      className="px-4 m-1"
                      variant="primary"
                      onClick={addHandler}
                    >
                      Add
                    </Button>
                    <Button
                      size="sm"
                      className="px-4 m-1"
                      variant="warning"
                      onClick={() => {
                        setShowForm(false);
                        removeMessage();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default AddQuestionForm;
