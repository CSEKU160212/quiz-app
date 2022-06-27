import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { loginCredentials } from "../../../mockStaticData/credentials";

const CredentialsPopupModal = () => {
  const [showModal, setShowModal] = useState(true);

  const toggleModal = (value) => {
    setShowModal(!value);
  };

  return (
    <>
      <Modal show={showModal} onHide={() => toggleModal(showModal)} scrollable>
        <Modal.Header closeButton>
          <div>Login Credentials</div>
        </Modal.Header>
        <Modal.Body>
          {loginCredentials.map((user) => {
            return (
              <>
                <Card key={user.id} bg="light" className="m-2">
                  <Card.Header>{`${user.role.toUpperCase()}`}</Card.Header>
                  <Card.Body>
                    <div>
                      <span style={{ fontWeight: "bold" }}>{`Name: `}</span>
                      {`${user.name}`}
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>{`Email: `}</span>
                      {`${user.email}`}
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>{`Password: `}</span>
                      {`${user.password}`}
                    </div>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CredentialsPopupModal;
