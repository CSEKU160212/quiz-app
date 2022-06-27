import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import {
  useQuizDispatch,
  useQuizState,
} from "../../../context/quizContext/context";
import { getQuizList } from "../../../context/quizContext/actions";
import { getActiveQuestions, getActiveQuizList } from "../../../utils";
import { generatePath, useHistory } from "react-router-dom";
import { answers } from "../../../constants/appRoutePaths";

const Quizzes = () => {
  const {data: quizList } = useQuizState();
  const dispatch = useQuizDispatch();

  const history = useHistory();

  useEffect(() => {
    getQuizList(dispatch);
  }, [dispatch]);

  const takeQuizHandler = (id)=>{
    const genereatedPath = generatePath(answers.path, { id });
    history.push(genereatedPath);
  }

  if(!getActiveQuizList(quizList).length){
    return <h4 className="m-3 mt-5 text-center text-danger">No Active Quiz Found</h4>
  }

  return (
    <>
      <div className="row m-4">
        <Row className="align-items-center flex-column flex-md-row">
          {quizList &&
            getActiveQuizList(quizList).map((quiz) => {
              return (
                <Col md={6} lg={4} key={quiz.id}>
                  <Card as="div" className="m-3 text-center shadow rounded">
                    <Card.Header>
                      <Card.Title>{quiz.topic}</Card.Title>
                    </Card.Header>
                    <Card.Body className="m-2">
                      <div>{`Total no of Questions: ${
                        getActiveQuestions(quiz?.questions)?.length
                      }`}</div>
                      <div>{`Total Marks: ${
                        getActiveQuestions(quiz?.questions)?.length
                      }`}</div>
                    </Card.Body>
                    <Button
                      as="button"
                      variant="outline-primary"
                      size="sm"
                      className="mb-3 mx-5"
                      onClick={() => takeQuizHandler(quiz.id)}
                    >
                      Take the quiz
                    </Button>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    </>
  );
};

export default Quizzes;
