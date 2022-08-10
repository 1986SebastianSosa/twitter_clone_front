import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import "./trendingSidenav.css";

const trending = [
  {
    topic: "Trending in Uruguay",
    title: "Punta Shopping",
    tweets: "2596 Tweets",
  },
  {
    topic: "Trending in Uruguay",
    title: "Charles Carrera",
    tweets: "6327 Tweets",
  },
  {
    topic: "Trending",
    title: "87,000 IRS",
    tweets: "70.8K Tweets",
  },
  {
    topic: "Politics - Trending",
    title: "China",
    tweets: "374K Tweets",
  },
  {
    topic: "Trending in Uruguay",
    title: "jokas",
    tweets: " ",
  },
  {
    topic: "Trending in Uruguay",
    title: "IRPF",
    tweets: "1,114 Tweets",
  },
  {
    topic: "dRAMA tv - tRENDING",
    title: "pEAKY bLINDERS",
    tweets: "2,285 Tweets",
  },
  {
    topic: "Trending in Uruguay",
    title: "Miamy",
    tweets: "47.6K Tweets",
  },
  {
    topic: "Politics - Trending",
    title: "Lula",
    tweets: "152K Tweets",
  },
  {
    topic: "Politics - Trending",
    title: "Rusia",
    tweets: "40.4K Tweets",
  },
];

const TrendingSidenav = () => {
  return (
    <>
      <Container>
        <Row className="flex-column">
          <Col className="mb-3 rounded-4 trending p-0">
            <h4 className="fw-bold p-3">Trends for you</h4>
            {trending.map((trend) => {
              return (
                <div className="trend ">
                  <div className="px-3 py-2 d-flex justify-content-between">
                    <div>
                      <span className="d-block text-muted">{trend.topic}</span>
                      <span className="fw-bold">{trend.title}</span>
                      <span className="d-block text-muted">{trend.tweets}</span>
                    </div>
                    <div className="trendIconDiv">
                      <FontAwesomeIcon
                        icon={faEllipsis}
                        className="trendIcon"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TrendingSidenav;
