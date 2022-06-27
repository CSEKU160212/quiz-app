import React, { useEffect, useState } from "react";
import {
  deleteQuestion,
  getQuizList,
  removeDeleteMessage,
  removeErrorMessage,
  removeQuizUpdateMessage,
  updateQuiz,
  useQuizDispatch,
  useQuizState,
} from "../../../context";
import { findQuizFromQuizList, getActiveQuestions } from "../../../utils";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { questionValidation } from "../../../utils/formValidations";
import AddQuestionForm from "./AddQuestionForm";
import AlertMessage from "../../components/AlertMessage";

const Questions = (props) => {
  const { match } = props;
  const quizId = match.params.id;

  const [quiz, setQuiz] = useState(null);
  const [editQuestionId, setEditQuestionId] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const {
    data: quizList,
    errorMessage,
    updateMessage,
    deleteMessage,
  } = useQuizState();

  const dispatch = useQuizDispatch();
  const history = useHistory();

  useEffect(() => {
    getQuizList(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const quiz = findQuizFromQuizList(quizList, quizId);
    setQuiz(quiz);
  }, [quizList, quizId, history]);

  const removeMessages = () => {
    removeQuizUpdateMessage(dispatch);
    removeErrorMessage(dispatch);
    removeDeleteMessage(dispatch);
  };

  const inputOnChangeHandler = (e, questionIndex, optionIndex) => {
    const currentQuiz = { ...quiz };
    currentQuiz.questions[questionIndex].options[optionIndex] = e.target.value;
    removeMessages();
  };

  const questionOnChangeHandler = (e, questionIndex) => {
    const currentQuiz = { ...quiz };
    currentQuiz.questions[questionIndex].question = e.target.value;
    removeMessages();
  };

  const answerOnChangeHandler = (e, questionIndex) => {
    const currentQuiz = { ...quiz };
    currentQuiz.questions[questionIndex].answer = e.target.value;
    removeMessages();
  };

  const editHandler = (id) => {
    setEditQuestionId(id);
    removeMessages();
  };

  const cancelHandler = () => {
    window.location.reload();
    removeMessages();
  };

  const updateHandler = (questionIndex) => {
    const validationErrors = questionValidation(quiz?.questions[questionIndex]);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
    } else {
      setFormErrors({});
      updateQuiz(dispatch, quiz);
    }
  };

  const deleteHandler = (questionId) => {
    deleteQuestion(dispatch, quizId, questionId);
  };

    return (
      <>
        <div className="m-3 mb-5">
          {quiz && (
            <h3 className="text-center">{`Quiz Topic: ${quiz.topic}`}</h3>
          )}
          <AddQuestionForm quizId={quiz?.id} />
          <AlertMessage variant="success" message={deleteMessage} />
          {quiz &&
            quiz.questions &&
            getActiveQuestions(quiz.questions).map(
              (questionItem, questionIndex) => {
                return (
                  <Card
                    as="div"
                    className="m-3 mt-4 shadow rounded"
                    key={`question-${questionIndex}`}
                  >
                    <Card.Header>
                      {editQuestionId === questionItem.id && (
                        <>
                          <AlertMessage
                            variant="danger"
                            message={errorMessage}
                          />
                          <AlertMessage
                            variant="success"
                            message={updateMessage}
                          />
                        </>
                      )}

                      {editQuestionId === questionItem.id ? (
                        <Form.Group
                          className="mb-2 justify-content-center mx-auto"
                          style={{ width: "60%" }}
                          controlId={`questions-${questionIndex}`}
                        >
                          <Form.Label>
                            <strong>{`Question:`}</strong>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            size="sm"
                            onChange={(e) =>
                              questionOnChangeHandler(e, questionIndex)
                            }
                            defaultValue={questionItem.question}
                            isInvalid={!!formErrors?.question}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors?.question}
                          </Form.Control.Feedback>
                        </Form.Group>
                      ) : (
                        <Card.Title className="text-center">
                          {`${questionIndex + 1}) ${questionItem.question}`}
                        </Card.Title>
                      )}
                    </Card.Header>
                    <Card.Body className="m-2 align-items-center justify-content-center">
                      <div className="text-left mx-auto">
                        <Row>
                          {questionItem?.options.map((option, optionIndex) => {
                            return editQuestionId === questionItem.id ? (
                              <Col
                                md={6}
                                lg={3}
                                sm={12}
                                key={`option-${optionIndex}`}
                              >
                                <Form.Group className="mb-2" controlId="option">
                                  <Form.Label>
                                    <strong>{`Option ${String.fromCharCode(
                                      65 + optionIndex
                                    )}:`}</strong>
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    onChange={(e) =>
                                      inputOnChangeHandler(
                                        e,
                                        questionIndex,
                                        optionIndex
                                      )
                                    }
                                    defaultValue={option}
                                  />
                                </Form.Group>
                              </Col>
                            ) : (
                              <Col
                                md={6}
                                lg={3}
                                sm={12}
                                className="mx-auto"
                                key={`${option}-div-${optionIndex}`}
                              >{`${String.fromCharCode(
                                65 + optionIndex
                              )}) ${option}`}</Col>
                            );
                          })}
                        </Row>
                        <div className="text-danger mb-2 small">
                          {formErrors?.options}
                        </div>

                        {editQuestionId === questionItem.id ? (
                          <Form.Group
                            className="mb-2"
                            controlId={`answer-${questionIndex}`}
                          >
                            <Form.Label>
                              <strong>{`Right Answer:`}</strong>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              size="sm"
                              onChange={(e) =>
                                answerOnChangeHandler(e, questionIndex)
                              }
                              defaultValue={questionItem.answer}
                              isInvalid={!!formErrors?.answer}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formErrors?.answer}
                            </Form.Control.Feedback>
                          </Form.Group>
                        ) : (
                          <p className="mt-2">
                            <strong className="font-weight-bold">{`Right Answer: `}</strong>
                            <strong className="text-success">{`${questionItem.answer}`}</strong>
                          </p>
                        )}
                      </div>
                    </Card.Body>
                    <Card.Footer className="text-center">
                      <Button
                        as="button"
                        variant={
                          editQuestionId === questionItem.id
                            ? "outline-success"
                            : "outline-primary"
                        }
                        size="sm"
                        className="mx-1"
                        onClick={() => {
                          editQuestionId === questionItem.id
                            ? updateHandler(questionIndex)
                            : editHandler(questionItem.id);
                        }}
                      >
                        {editQuestionId === questionItem.id
                          ? "Save Changes"
                          : "Edit Question"}
                      </Button>
                      {editQuestionId === questionItem.id && (
                        <Button
                          as="button"
                          variant="outline-info"
                          size="sm"
                          className="mx-1"
                          onClick={() => cancelHandler()}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        as="button"
                        variant="outline-danger"
                        size="sm"
                        className="mx-1"
                        onClick={() => deleteHandler(questionItem.id)}
                      >
                        Delete Question
                      </Button>
                    </Card.Footer>
                  </Card>
                );
              }
            )}
        </div>
      </>
    );
};

export default Questions;
