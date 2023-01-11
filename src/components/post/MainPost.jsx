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
import { useDispatch, useSelector } from "react-redux";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  selectTweetsToShow,
  selectHasMore,
  setTweetsToShow,
} from "./../../redux/tweetsSlice";

const MainPost = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const hasMore = useSelector(selectHasMore);
  const allTweets = useSelector(selectTweetsToShow);
  const [focused, setFocused] = useState(false);
  const [tweetContent, setTweetContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tweetContent.length) {
      setIsError(false);
    }
  }, [tweetContent]);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = (e) => {
    setTweetContent(e.target.value);
  };

  const handlePostTweet = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!tweetContent.length) {
      setError("* You need to write something");
      return setIsError(true);
    }
    try {
      const postResponse = await axiosPrivate({
        url: "/tweet",
        method: "post",
        data: {
          tweetContent,
          createdOn: new Date(),
        },
      });
      const fetchResponse = await axiosPrivate.get(
        `/tweet/${postResponse.data._id}`
      );
      dispatch(
        setTweetsToShow({
          hasMore,
          tweetsToShow: [fetchResponse.data, ...allTweets],
        })
      );
      setTweetContent("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    // try {
    //
    //   } else {
    //     setIsLoading(true);
    //     await postTweet(token, tweetContent);
    //     setTweetContent("");
    //     const fetchTweets = async () => {
    //       const response = await getAllTweets(user, token, page);
    //       if (!response.data.tweetsToShow.length && !allTweets.length) {
    //         setIsLoading(false);
    //         return;
    //       }
    //       if (response.data.tweetsToShow.length === 0) {
    //         setHasMore(false);
    //       }
    //       setNoTweets(false);
    //       setAllTweetsLength(response.data.allTweetsLength);
    //       setAllTweets(response.data.tweetsToShow);
    //       setIsLoading(false);
    //     };
    //     fetchTweets();
    //   }
    // } catch (error) {
    //   setError("You need to be logged in to write something");
    //   setIsError(true);
    //   // setTimeout(() => {
    //   //   navigate("/");
    //   // }, 5000);
    // }
  };

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
              <form onSubmit={(e) => handlePostTweet(e)}>
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
                    {isError && <span className="text-danger">{error}</span>}
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
