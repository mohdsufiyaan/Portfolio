import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
          Hello Everyone, My name is Mohd Sufiyan, and I'm from <span className="purple"> Noida, India</span>
            <br />
            I am currently employed as a software engineer at i3infosoft
            <br />
            with 3+ years experience.
            <br />
            In 2019, I obtained my Integrated B.Sc. in Computer Science from MJPRU.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Cricket
            </li>
            <li className="about-activity">
              <ImPointRight /> Riding bike
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Make an effort to create things that have an impact!"{" "}
          </p>
          <footer className="blockquote-footer">Sufiyan</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
