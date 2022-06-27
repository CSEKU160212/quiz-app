import React, { useEffect, useState } from "react";
import { deleteQuiz, getQuizList, quizRestore, useQuizDispatch, useQuizState } from "../../../context";
import { Table, Button } from "react-bootstrap";
import { quizTableHeader } from "../../../constants/quizTableHeaders";
import { generatePath, useHistory } from "react-router-dom";
import { questions } from "../../../constants/appRoutePaths";
import { getActiveQuestions } from "../../../utils";

const Index = () => {
  const { data: quizList } = useQuizState();
  const [limit, setLimit] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  
  const history = useHistory();
  const dispatch = useQuizDispatch();

  useEffect(() => {
    getQuizList(dispatch);
  }, [dispatch]);

  const deleteHandler = (id)=>{
    deleteQuiz(dispatch, id);
  }

  const restoreHandler = (id)=>{
    quizRestore(dispatch, id);
  }

  const viewQuestionsHandler = (id)=>{
    const genereatedPath = generatePath(questions.path, {id})
    history.push(genereatedPath);
  }


  if(!quizList.length){
    return (
      <h4 className="lg-m-3 sm-m-1 md-m-2 mt-5 text-center text-danger">
        No Quiz Found
      </h4>
    );
  }

  return (
    <>
      <div className="row lg-m-4 sm-m-1 md-m-2 mt-4">
        <Table
          responsive="md"
          bordered
          hover
          className="justify-content-center text-center shadow-sm"
        >
          <thead>
            <tr>
              {quizTableHeader.map((header) => {
                return <th key={header.key}>{header.title}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {quizList &&
              quizList.map((quiz) => {
                return (
                  <tr key={quiz.id}>
                    <td>{quiz?.topic}</td>
                    <td>{getActiveQuestions(quiz?.questions)?.length}</td>
                    <td>{getActiveQuestions(quiz?.questions)?.length}</td>
                    <td>
                      {quiz?.isDeleted ? (
                        <span style={{ color: "red" }}>Deleted</span>
                      ) : (
                        <span style={{ color: "green" }}>Active</span>
                      )}
                    </td>
                    <td>
                      <Button
                        size="sm"
                        className="m-1"
                        variant="outline-primary"
                        onClick={() => viewQuestionsHandler(quiz.id)}
                      >
                        View
                      </Button>
                      {quiz.isDeleted ? (
                        <>
                          <Button
                            size="sm"
                            className="m-1"
                            variant="outline-success"
                            onClick={() => restoreHandler(quiz.id)}
                          >
                            Restore
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          className="m-1"
                          variant="outline-danger"
                          onClick={() => deleteHandler(quiz.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            <tr></tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Index;
