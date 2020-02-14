/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import axios from "axios";

export default function Menu(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [showUser, setShowUser] = useState(undefined);

  function getUser() {
    axios
      .get("/api/users")
      .then(res => {
        props.setUser(res.data[0]);
        setCurrentUser(res.data[0].name);
        setIsLoggedIn(true);
        setShowUser(true);
        let userObj = JSON.stringify(res.data[0]);
        window.localStorage.setItem("user", userObj);
      })
      .catch(err => {
        console.log(err);
      });
  }

  let userDiv;
  if (showUser) {
    userDiv = <div style={{ marginRight: "14px", fontWeight: "bold" }}> Logged in as {currentUser} </div>;
  }

  return (
    <Navbar expand="lg">
      <Navbar.Brand
        href="#home"
        style={{
          fontSize: "2.00rem",
          fontWeight: "bolder",
          fontFamily: "'Press Start 2P', 'cursive'"
        }}
      >
        Xstitch
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" style={{ fontSize: "1.5em" }}>
          <Nav.Link href="#home" onClick={() => props.setPage("home")}>
            Home
          </Nav.Link>
          <Nav.Link href="#link" onClick={() => props.clearAndSetCreate()}>
            Create
          </Nav.Link>
          <Nav.Link href="#action/3.1" onClick={() => props.setShowMenu(true)}>
            My Patterns
          </Nav.Link>
        </Nav>
        {userDiv}
        <Button
          variant="outline-success"
          onClick={getUser}
        >
          Login
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
