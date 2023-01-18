import React, { useEffect } from "react";
import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BotNav from "../../components/botNav/BotNav";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import Searchbar from "../../components/searchbar/Searchbar";
import Sidenav from "../../components/sidenav/Sidenav";
import Topnav from "../../components/topnav/Topnav";
import TrendingSidenav from "../../components/trendingSidenav/TrendingSidenav";
import WhoToFollow from "../../components/whoToFollow/WhoToFollow";
import { selectWindowWidth, setWindowWidth } from "../../redux/appSlice";
import { techList } from "./utils/techList";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import seba from "../../img/seba.jpeg";
import erm from "../../img/twitter_clone_ERM.png";
import "./about.css";

const About = () => {
  const windowWidth = useSelector(selectWindowWidth);
  const dispatch = useDispatch();
  const [showErmModal, setShowErmModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleWindowResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleWindowResize);
  }, []);

  return (
    <Container>
      <Row>
        <Col sm={2} md={3} className={`${windowWidth < 576 && "d-none"}`}>
          <Sidenav windowWidth={windowWidth} />
        </Col>
        <Col
          xs={12}
          sm={10}
          md={9}
          lg={6}
          className="border-start border-end border-light p-0"
        >
          {windowWidth > 576 ? (
            <>
              <Topnav title="About" />
            </>
          ) : (
            <MobileHeader />
          )}
          <Container>
            <Row>
              <Col
                xs={12}
                className="d-flex align-items-center justify-content-center"
              >
                <Image src={seba} roundedCircle className="seba" />
              </Col>
              <Col xs={12}>
                <h2 className="text-center my-5">About me</h2>
                <p>
                  Hi! My name is <b>Sebastian Sosa</b>, I'm 36 years old and I'm
                  a <b>Full Stack Web Developer</b>. For most of my adult life
                  I've been working as a lifeguard in the summers and as a sound
                  designer during the rest of the year, being part of the Sound
                  Department for several films, short films, documentaries and
                  commercials.{" "}
                </p>
                <p>
                  In the summer of 2021-2022 I decided to change careers and
                  pursue my newfound passion for web development. So I started
                  to learn all I could online, studying during my break time at
                  the beach, celphone in hand watching the videos from{" "}
                  <b>Colt Steele's Full Stack Web Developer</b> course on{" "}
                  <b>Udemy</b>, which was enough to pass the entrance test for
                  the <b>Coding Bootcamp</b> at <b>Hack Academy</b>, which was
                  an 8 hour a day, 3 month long course in which we learn the
                  skills to build professional full stack web applications.
                  Currently I am working as a developer for{" "}
                  <b>Tata Consultancy Services</b>.
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h2 className="text-center my-5">About the Project</h2>
                <p>
                  This project started as an excercise from <b>Hack Academy</b>{" "}
                  while going through the React.js part of the Bootcamp. After
                  the course was done I decided to{" "}
                  <b>re-write it from scratch</b> because of a few reasons:
                  first, I wanted to <b>build a server</b> because I felt that
                  my backend expertise was lacking. Also, I wanted introduce
                  some techniques like <b>JWT access and refresh tokens</b> with{" "}
                  <b>axios requests and response interceptors</b> which haven't
                  used before. I also wanted to use <b>RTK Query</b> which I
                  absolutely LOVED but ultimately found to be <b>unsuitable</b>{" "}
                  for this particular project. Finally, I wanted to see if I
                  could do it without the help from my instructors at Hack
                  Academy.
                </p>
              </Col>
              <Col xs={12}>
                <h2 className="text-center my-5">Technologies</h2>
                <Container>
                  <Row>
                    {techList.map((tech) => {
                      return (
                        <Col
                          key={tech.id}
                          className="d-flex flex-column align-items-center"
                          xs={4}
                          sm={3}
                          xxl={2}
                        >
                          <img
                            src={tech.icon}
                            alt={tech.title}
                            className="tech"
                          />
                          <p className="text-center">
                            <b>{tech.title}</b>
                          </p>
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h2 className="text-center my-5">Challenges</h2>
                <p>
                  I wrote the whole project with <b>React.js</b> without the
                  help of <b>Redux.js</b>, managing all of my state locally in
                  each component. But when I realized there was a lot of{" "}
                  <b>prop drilling</b> and the need for a practical way to{" "}
                  <b>persist</b> some state like the <b>access token</b> and the{" "}
                  <b>user</b> then I opted to <b>rewrite</b> the app using{" "}
                  <b>Redux.js</b>. I actually <b>went overboard</b> with{" "}
                  <b>Redux.js</b> and tried to use global state for things like{" "}
                  <b>"isLoading"</b> and <b>"isSuccess"</b>
                  but soon realized this was causing <b>problems</b> when making{" "}
                  <b>HTTP requests</b> from different components. So, finally, I
                  decided to manage these and other states locally which made
                  everything more manageable.
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <img
                  src={erm}
                  className="erm mb-5"
                  alt="Entity relationship model"
                  onClick={() => setShowErmModal(true)}
                />
              </Col>
            </Row>
          </Container>
        </Col>
        {windowWidth >= 992 && (
          <Col xs={3}>
            <Searchbar />
            <TrendingSidenav />
            <WhoToFollow />
          </Col>
        )}
      </Row>

      {windowWidth < 576 && <BotNav />}
      <Modal
        show={showErmModal}
        onHide={() => setShowErmModal(false)}
        size="xl"
      >
        <Modal.Body>
          <div className="d-flex align-items-center m-0 p-0">
            <FontAwesomeIcon icon={faInfoCircle} />
            <h6 className="m-0 p-0 ms-1"> MongoDB - Mongoose</h6>
          </div>
          <Image src={erm} className="erm" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErmModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default About;
