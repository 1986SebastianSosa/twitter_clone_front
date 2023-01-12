import React, { useState } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./searchbar.css";

const Searchbar = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <Container className="p-0 my-2">
      <Row>
        <Col>
          <OverlayTrigger
            placement="left"
            overlay={
              <Tooltip id="search-bar">
                <FontAwesomeIcon icon={faCircleInfo} />{" "}
                <span>This feature will be comming soon!</span>
              </Tooltip>
            }
          >
            <div
              className={`rounded-pill w-100 py-2 bg-light searchbar border ${
                focused ? "border-primary bg-white" : "border-white"
              }`}
            >
              <Row className="justify-content-between">
                <Col xs={2}>
                  <div className="ms-3">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className={`${focused && "text-primary"}`}
                    />
                  </div>
                </Col>
                <Col xs={10}>
                  <input
                    data-for="outOfScope"
                    data-tip={showTooltip && ""}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    type="text"
                    className={`border-0 me-2 text-muted searchInput ${
                      focused && "bg-white"
                    }`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </Col>
              </Row>
            </div>
          </OverlayTrigger>
        </Col>
      </Row>
      {/* {showTooltip && <FontAwesomeIcon icon={faCircleInfo} />} */}
    </Container>
  );
};

export default Searchbar;
