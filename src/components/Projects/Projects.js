import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import attendancedeskapp from "../../Assets/Projects/attendancedeskapp.png";
import hrmlimage from "../../Assets/Projects/hrmlimage.png";
import jobportals from "../../Assets/Projects/jobportals.png";
import crmimage from "../../Assets/Projects/crmimage.png";
import edtech from "../../Assets/Projects/edtech.png";
import bookandarticles from "../../Assets/Projects/bookandarticles.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={crmimage}
              isBlog={false}
              title="CRM"
              description="CRM that satisfies their unique operational requirements. Any B2B company must have a strong sales force, excellent customer service, carefully thought-out marketing campaigns, and a system in place to track total productivity.
              In order to facilitate easier access to the student curriculum, the trainer trained student counseling with student management and the student for the LMS
              "
              ghLink=""
              demoLink="https://4achieversonline.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bookandarticles}
              isBlog={false}
              title="Book & Articles"
              description="Ideated and developed With the innovative website Shabd.in, can monetize your work by selling books and articles.may quickly design and publish books with our user-friendly interface.
              An Online Writing, Publishing, & Sales Platform... On Shabd.in, are able to write and publish an infinite number of books for free. With multiple language
              "
              ghLink=""
              demoLink="https://shabd.in/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={jobportals}
              isBlog={false}
              title="Job Portal"
              description="The job portal Jobhubster allows job seekers to easily register, log in, and create a profile. 
              Applying for jobs and monitoring recruiters' comments is made simple for job seekers who search for positions by firm, title, and other criteria.
              Employer recruiters can easily log in, register using an auth key for the first time, and search job seekers' profiles and resumes as needed"
              ghLink=""
              demoLink="https://jobhubster.in/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={edtech}
              isBlog={false}
              title="Edtech web"
              description="edtech website for the IT institution offering the training; view the Design Demo"
              //ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
              demoLink="https://www.4achievers.co.in/" 
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={attendancedeskapp}
              isBlog={false}
              title="Privately Employee Attendance deskapp"
              description="Building a desk application with electron.js technology solely for staff attendance at appropriate times and without exceeding any time limits 
              Automatically displayed employee mark attendance alert with time 
              The system will automatically shut down if the employee has not yet left the office within the given period and  the machine is still working. and advise that it's time to head home.
              Employees are only permitted to take attendance inside the office; outside of it is not permitted. by application
              "
              ghLink=""
           
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={hrmlimage}
              isBlog={false}
              title="HRMS"
              description="The Human Resources Management Information System (HRMIS) software facilitates the streamlining of HR processes
               for small and medium-sized businesses by integrating HR functions such as hiring, onboarding, performance management, training and development, payroll management,
                and employee records into a single platform. Automated onboarding, tracking time off requests, employee performance management, and employee data management 
                are some of the features."
              // ghLink="https://github.com/soumyajit4419/Face_And_face_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
