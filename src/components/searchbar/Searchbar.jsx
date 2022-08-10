import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./searchbar.css";

const Searchbar = () => {
  return (
    <Container className="p-0 my-2">
      <Row>
        <Col>
          <div className="rounded-pill w-100 py-2 searchbar">
            <Row className="justify-content-between">
              <Col xs={2}>
                <div className="ms-3">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
              </Col>
              <Col xs={10}>
                <input type="text" className="border-0 me-2" />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Searchbar;
