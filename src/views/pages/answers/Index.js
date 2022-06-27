import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import {
  getQuizList,
  useAuthState,
  useQuizDispatch,
  useQuizState,
} from "../../../context";
import {
  findQuizFromQuizList,
  formatQuiz,
  getActiveQuestions,
} from "../../../utils";
import {
  setCompleteQuizList,
  setLocalStorageUserQuiz,
} from "../../../utils/localStorageHandlers";
import ResultModal from "./ResultModal";

const Index = (props) => {
  const { match } = props;
  const quizId = match.params.id;

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [result, setResult] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultText, setResultText] = useState(null);

  const { data: quizList } = useQuizState();
  const dispatch = useQuizDispatch();
  const { authUser } = useAuthState();

  const toggleShowResult = (value) => {
    setShowResultModal(!value);
  };

  const incrementResult = () => {
    setResult((prevResult) => prevResult + 1);
  };

  const decrementResult = () => {
    setResult((prevResult) => prevResult - 1);
  };

  useEffect(() => {
    getQuizList(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const quiz = findQuizFromQuizList(quizList, quizId);
    setQuiz(quiz);
    const questions = getActiveQuestions(quiz?.questions);
    setQuestions(questions);
  }, [quizList, quizId]);

  const onSelectionchange = (value, questionIndex) => {
    console.log(value);
    console.log({ questionIndex });
    const questionBank = [...questions];
    const previousSelection = questionBank[questionIndex]?.userAnswer;

    if (
      previousSelection !== questionBank[questionIndex]?.answer &&
      value === questionBank[questionIndex]?.answer
    ) {
      incrementResult();
    } else if (
      previousSelection === questionBank[questionIndex]?.answer &&
      value !== questionBank[questionIndex]?.answer
    ) {
      decrementResult();
    }

    questionBank[questionIndex].userAnswer = value;
    setQuestions(questionBank);

    const formatedQuiz = formatQuiz(quiz, questions);
    console.log({ formatedQuiz });
    setLocalStorageUserQuiz(authUser?.id, formatedQuiz);
  };

  const submitHandler = () => {
    const formatedQuiz = formatQuiz(quiz, questions);
    formatQuiz.user = authUser;
    setCompleteQuizList(formatedQuiz);

    const customResultText = `You hav got ${result} out of ${questions.length}`;

    alert()
    setResultText(customResultText, () => {
      toggleShowResult(showResultModal);
    });
  };

  return (
    <>
      <div className="m-3">
        <h3 className="text-center">{`Topic ${quiz?.topic}`}</h3>
      </div>

      {questions &&
        questions.map((questionItem, questionIndex) => {
          return (
            <Row key={`question-${questionItem.id}`} className="m-2">
              <Col sm={12} md={8} lg={6} className="mx-auto">
                <Card>
                  <Card.Header>
                    <Card.Title>{`${questionIndex + 1}) ${
                      questionItem?.question
                    }`}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {questionItem?.options?.map((option, optionIndex) => {
                        return (
                          <Col
                            md={6}
                            lg={6}
                            sm={6}
                            key={`option-${optionIndex}-question-${questionIndex}`}
                            className="text-left"
                          >
                            <div className="d-grid gap-2">
                              <Button
                                className="mb-2 btn-block"
                                id={`option-${optionIndex}`}
                                variant={
                                  questions[questionIndex]?.userAnswer ===
                                  option
                                    ? "primary"
                                    : "outline-primary"
                                }
                                onClick={() =>
                                  onSelectionchange(option, questionIndex)
                                }
                              >
                                {option}
                              </Button>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          );
        })}
      <div className="text-center">
        <Button
          size="sm"
          className="px-5 mb-5"
          variant="success"
          onClick={submitHandler}
        >
          Submit
        </Button>
      </div>
      <ResultModal
        toggleShowResult={toggleShowResult}
        message={resultText}
        show={showResultModal}
      />
    </>
  );
};

export default Index;
