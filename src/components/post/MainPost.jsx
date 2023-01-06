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
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import {
  useLazyFetchTweetsQuery,
  usePostTweetMutation,
} from "../../app/api/tweetsApiSlice";
import { useFormik } from "formik";
import { selectPage } from "../../redux/appSlice";

const MainPost = ({
  user,
  allTweets,
  setAllTweets,
  setNoTweets,
  setHasMore,
  setAllTweetsLength,
}) => {
  const page = useSelector(selectPage);
  const [focused, setFocused] = useState(false);
  const [tweetContent, setTweetContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  // console.log(useFetchTweetsQuery(page));
  const [postTweet, postTweetResult] = usePostTweetMutation();
  const [trigger] = useLazyFetchTweetsQuery(page);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = (e) => {
    setTweetContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!tweetContent.length) {
        setErrorMsg("* You need to write something");
        setShowErrorMsg(true);
      } else {
        setTweetContent("");
        await postTweet({ tweetContent, createdOn: new Date() });
        trigger(page);
      }
    } catch (error) {
      setErrorMsg("You need to be logged in to write something");
      setShowErrorMsg(true);
      // setTimeout(() => {
      //   navigate("/");
      // }, 5000);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [allTweets]);

  useEffect(() => {
    if (tweetContent.length) {
      setShowErrorMsg(false);
    }
  }, [tweetContent]);

  return (
    <>
      {postTweetResult.isLoading ? (
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
                    onChange={handleChange}
                    value={tweetContent}
                  />

                  <Col>
                    {showErrorMsg && (
                      <span className="text-danger">{errorMsg}</span>
                    )}
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
