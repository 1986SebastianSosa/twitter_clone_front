import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./aboutButton.css";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const AboutButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className="aboutButton rounded-pill d-flex align-items-center"
      onClick={() => navigate("/about")}
    >
      <FontAwesomeIcon icon={faTwitter} className="fa-xl me-3" />
      <h4>About</h4>
    </div>
  );
};

export default AboutButton;
