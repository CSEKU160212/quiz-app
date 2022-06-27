import React from 'react'
import { Button, Modal } from 'react-bootstrap';

const ResultModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.toggleShowResult}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.toggleShowResult}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResultModal