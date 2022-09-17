import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showFollowSuggestions } from "../../services/followServices";
import FollowCard from "../followCard/FollowCard";
import "./whoToFollow.css";

const WhoToFollow = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [followSuggestions, setFollowSuggestions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const response = await showFollowSuggestions(user, token);
      setFollowSuggestions(response.data.slice(0, 3));
    };
    fetch();
  }, []);
  return (
    <>
      <Container>
        <Row className="flex-column">
          <Col className="mb-3 rounded-4 bg-light p-0">
            <h4 className="fw-bold p-3">Who to follow</h4>
            {followSuggestions.map((suggestion, index) => {
              return (
                <div className="px-3" key={index}>
                  <FollowCard suggestion={suggestion} />
                </div>
              );
            })}
            <div className="p-3">
              <span
                className="show-more text-primary"
                onClick={() => navigate(`/follow/${user._id}`)}
              >
                Show more
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WhoToFollow;
