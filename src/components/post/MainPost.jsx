import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  faImage,
  faSquarePollHorizontal,
  faFaceSmile,
  faCalendarDay,
  faLocationDot,
  faUser,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";
import "./mainpost.css";
import { getAllTweets, postTweet } from "./../../services/tweetServices";
import { PuffLoader } from "react-spinners";

const MainPost = ({ user, allTweets, setAllTweets }) => {
  const [focused, setFocused] = useState(false);
  const [tweetInput, setTweetInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (e) => {
    setTweetInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await postTweet(user, tweetInput);
    const getTweets = async () => {
      const response = await getAllTweets(user);
      const sortedData = response.data.sort(
        (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
      );
      setAllTweets(sortedData);
    };
    getTweets();
    setTweetInput("");
    setFocused(false);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [allTweets]);

  return (
    <>
      {isLoading ? (
        <PuffLoader size={100} color="#1d9bf0" className="m-auto" />
      ) : (
        <Row className="p-2 border-bottom border-light">
          <Col xs={2}>
            <div className="rounded-circle d-flex justify-content-center align-items-center user-icon bg-light">
              <FontAwesomeIcon icon={faUser} className="fa-3x text-secondary" />
            </div>
          </Col>
          <Col xs={10}>
            <Row className="flex-column">
              <form onSubmit={(e) => handleSubmit(e)}>
                <Col className="p-2">
                  <input
                    name="tweetContent"
                    type="text"
                    className="border-0 main-input text-muted fs-5"
                    placeholder="What's happening?"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={tweetInput}
                  />

                  <Col>
                    {focused && (
                      <div className="border-bottom border-light">
                        <Button className="bg-white border-0 text-primary reply-btn rounded-pill py-0 mt-3 mb-2">
                          <FontAwesomeIcon icon={faEarthAmericas} />
                          <span className="ms-1 fs-6 fw-semibold">
                            Everyone can reply
                          </span>
                        </Button>
                      </div>
                    )}
                  </Col>
                </Col>
                <Col className="p-2 d-flex justify-content-between">
                  <div>
                    <ul className="d-flex icon-list p-0 m-0">
                      <li>
                        <FontAwesomeIcon icon={faImage} />
                      </li>
                      <li>
                        <img src="/gif-icon.svg" alt="" />
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faSquarePollHorizontal} />
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faFaceSmile} />
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCalendarDay} />
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faLocationDot} />
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Button
                      className="px-3 text-white rounded-pill fw-bold"
                      type="submit"
                    >
                      Tweet
                    </Button>
                  </div>
                </Col>
              </form>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default MainPost;
