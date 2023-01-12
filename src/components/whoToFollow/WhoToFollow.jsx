import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { selectToken, selectUser } from "../../redux/authSlice";
import { showFollowSuggestions } from "../../services/followServices";
import FollowCard from "../followCard/FollowCard";
import "./whoToFollow.css";
import { PuffLoader } from "react-spinners";

const WhoToFollow = () => {
  const user = useSelector(selectUser);
  const [followSuggestions, setFollowSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosPrivate.get("/follower");
        setFollowSuggestions(response.data.slice(0, 3));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <Container>
        <Row className="flex-column">
          <Col className="mb-3 rounded-4 bg-light p-0">
            {isLoading ? (
              <div className="loading">
                <PuffLoader size={200} color="#1d9bf0" />
              </div>
            ) : (
              <>
                <h4 className="fw-bold p-3">Who to follow</h4>
                {followSuggestions.map((suggestion) => {
                  return (
                    <div className="px-3" key={suggestion._id}>
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
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WhoToFollow;
