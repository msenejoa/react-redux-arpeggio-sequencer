import React from "react";
import { Row, Col } from "react-flexbox-grid";

const About = () => (
  <Row>
    <Col xs={12}>
      <Row center="xs">
        <Col style={{ color: "grey" }}>
          <h1>About</h1>
          <p>Creted by Michael Senejoa</p>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default About;
