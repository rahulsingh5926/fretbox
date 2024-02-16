import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

// Importing the Poppins font from Google Fonts
import "../index.css";

function navbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img href="logo" width="50%" src="/resources/fretbox.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div
          className="d-none d-lg-block"
          style={{ paddingLeft: "200px" }}
        ></div>
        <Navbar.Collapse id="basic-navbar-nav pl-4">
          <Nav className=" d-flex justify-content-between w-75">
            <Nav.Link
              style={{ color: "#2BAAE1", fontFamily: "Poppins, sans-serif" }}
              href="#home"
            >
              Welcome
            </Nav.Link>

            <NavDropdown
              style={{ fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}
              title="Our Story"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                href="#action/3.1"
                style={{ fontWeight: "bold" }}
              >
                Action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              style={{ fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}
              href="#link"
            >
              Products
            </Nav.Link>
            <Nav.Link
              style={{ fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}
              href="#link"
            >
              Features
            </Nav.Link>
            <NavDropdown
              style={{ fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}
              title="Insights"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <button
              style={{ borderRadius: "50px", width: "130px" }}
              type="button"
              class="btn btn-success "
            >
              Get in Touch
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;
