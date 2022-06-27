import React, { useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import TheFooter from '../../../containers/TheFooter';
import TheHeader from '../../../containers/TheHeader';
import LoginForm from "./LoginForm";
import loginPageImage from "../../../assets/login_page_image.jpg";
import CredentialsPopupModal from './CredentialsPopupModal';
import { home } from '../../../constants/appRoutePaths';
import { useHistory } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../../../context';

const Login = () => {
  const { authUser, isAuthenticated } = useAuthState();

  const history = useHistory();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    if (authUser && isAuthenticated) {
      history.push(home.path);
    }
  }, [isAuthenticated, authUser, dispatch, history]);

  return (
    <>
      <TheHeader />
      <Container>
        <div className="row m-4">
          <Row className="align-items-center flex-column-reverse flex-md-row">
            <Col md={6}>
              <LoginForm />
            </Col>
            <Col md={6}>
              <Image
                src={loginPageImage}
                style={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                }}
              />
            </Col>
          </Row>
        </div>
        <CredentialsPopupModal />
      </Container>
    </>
  );
}

export default Login