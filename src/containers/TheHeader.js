import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { login } from "../constants/appRoutePaths";
import { logoutUser, useAuthDispatch, useAuthState } from "../context";
import { getVisibleNavItems } from "../utils";
import TheHeaderIcon from "./TheHeaderIcon";
import { navItems } from "./_nav";

const TheHeader = () => {
  const { authUser, isAuthenticated } = useAuthState();
  
  const dispatch = useAuthDispatch();
  const history = useHistory();

  let _navItems = [];

  if (authUser) {
    _navItems = getVisibleNavItems(navItems, authUser.role);
  }

  const logoutHandler = ()=>{
    logoutUser(dispatch);
    history.push(login.path);
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#">
            <TheHeaderIcon />
          </Navbar.Brand>
          {isAuthenticated && (
            <>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  {_navItems.map((item) => {
                    return (
                      <Nav.Link key={item.key} href={`${item.href}`}>
                        {item.title}
                      </Nav.Link>
                    );
                  })}
                  {isAuthenticated && <Nav.Link onClick={logoutHandler}>LOGOUT</Nav.Link>}
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default TheHeader;
