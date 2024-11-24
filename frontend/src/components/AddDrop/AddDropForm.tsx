import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Course } from "../../types";
import { TestCourses } from "../../testData";

interface Props {
  studentID: string;
}

const AddDropForm = ({ studentID }: Props) => {
  // Current courses student is enrolled in
  const [currentCourses, setCurrentCourses] = useState<Course[]>(
    // TODO: Get current courses for studentID from database
    TestCourses
  );

  /**
   * Drops student from course in database
   * TODO: connect to database
   * @param courseId ID for course to be dropped
   */
  const handleDrop = (courseId: number) => {};

  /**
   * Registers student for course(s)
   * TODO: implement and connect to database
   */
  const handleRegister = () => {};

  return (
    <>
      {/* Current courses table*/}
      <div className="p-3">
        <div className="h5 text-body-secondary">Current enrollments</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course ID</th>
              <th scope="col">Course Prefix</th>
              <th scope="col">Course Number</th>
              <th scope="col">Credits</th>
              <th scope="col">Instructor</th>
              <th scope="col">Drop Course</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses?.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.prefix}</td>
                <td>{course.number}</td>
                <td>{course.credits}</td>
                <td>{course.instructorId}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      handleDrop(course.id);
                    }}
                  >
                    Drop Course
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add courses form */}
      {/* TODO: Store/handle entered courseIDs */}
      <div className="p-3">
        <div className="h5 text-body-secondary">Register for courses</div>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="courseID-1">
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter course ID"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="courseID-2">
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter course ID"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="courseID-3">
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter course ID"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="courseID-4">
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter course ID"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button onClick={handleRegister}>Register</Button>
        </Form>
      </div>
    </>
  );
};

export default AddDropForm;
