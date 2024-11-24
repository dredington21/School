import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { emptyEnrollment, Enrollment } from "../../types";
import { TestEnrollments } from "../../testData";

interface Props {
  studentID: string;
}

/**
 * Converts letter grade to point value
 * @param grade Letter grade
 * @returns Corresponding point value
 */
const letterToPoints = (grade: string): number => {
  switch (grade) {
    case "A":
    case "S":
      return 4;
    case "B":
      return 3;
    case "C":
      return 2;
    case "D":
      return 1;
    case "F":
    case "U":
    case "I":
      return 0;
    default:
      return 0;
  }
};

/**
 * Calculates student's GPA for what-if analysis
 * @param pastEnrollemnts Array of already taken courses
 * @param proposedEnrollments Array of proposed coursess
 * @returns New numerical GPA if proposed courses are taken
 */
const calculateGPA = (
  pastEnrollemnts: Enrollment[],
  proposedEnrollments: Enrollment[]
): number => {
  let totalPoints = 0;
  let totalCredits = 0;
  pastEnrollemnts.forEach((enrollment) => {
    totalPoints += letterToPoints(enrollment.grade) * enrollment.course.credits;
    totalCredits += Number(enrollment.course.credits);
  });
  proposedEnrollments.forEach((enrollment) => {
    totalPoints += letterToPoints(enrollment.grade) * enrollment.course.credits;
    totalCredits += Number(enrollment.course.credits);
  });
  return totalPoints / totalCredits;
};

const WhatIfAnalysisForm = ({ studentID }: Props) => {
  // Student's previously taken courses
  const [pastEnrollemnts, setPastEnrollemnts] = useState<Enrollment[]>(
    // TODO: Get enrollments for studentID user from database
    TestEnrollments
  );

  // Calulates and stores GPA based on courses already taken
  // TODO: Just get this value from where it's in the database, rather than calculating it
  const originalGPA = useMemo(
    () => calculateGPA(pastEnrollemnts, []),
    [pastEnrollemnts]
  );

  // Proposed courses added to what-if form
  const [proposedEnrollments, setProposedEnrollments] = useState<Enrollment[]>(
    []
  );

  // Course currently being modified in form
  const [newEnrollment, setNewEnrollment] =
    useState<Enrollment>(emptyEnrollment);

  // GPA after proposed courses are taken
  const [proposedGPA, setProposedGPA] = useState<number>(originalGPA);

  /**
   * When the form is submitted, add the newly proposed courses to list of proposed courses
   * and recalculate GPA based on proposed and original courses
   * @param event
   */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const updatedEnrollments = [...proposedEnrollments, newEnrollment];
    setProposedEnrollments(updatedEnrollments);
    setNewEnrollment(emptyEnrollment);
    setProposedGPA(calculateGPA(pastEnrollemnts, updatedEnrollments));
  };

  // Handle changes in form to newEnrollment
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Check if the name is a nested field
    if (name === "prefix" || name === "number" || name === "credits") {
      setNewEnrollment((prevEnrollment) => ({
        ...prevEnrollment,
        course: {
          ...prevEnrollment.course,
          [name]: value,
        },
      }));
    } else {
      setNewEnrollment((prevEnrollment) => ({
        ...prevEnrollment,
        [name]: value,
      }));
    }
  };

  return (
    <>
      {/* Enrollment tables section */}
      <div className="row p-3">
        {/* Past enrollments table*/}
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="h5 text-body-secondary">Past Courses</div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Course Prefix</th>
                <th scope="col">Course Number</th>
                <th scope="col">Semester</th>
                <th scope="col">Credits</th>
                <th scope="col">Grade</th>
              </tr>
            </thead>
            <tbody>
              {pastEnrollemnts?.map((enrollment, index) => (
                <tr key={index}>
                  <td>{enrollment.course.prefix}</td>
                  <td>{enrollment.course.number}</td>
                  <td>
                    {enrollment.course.semester}
                    {enrollment.course.year}
                  </td>
                  <td>{enrollment.course.credits}</td>
                  <td>{enrollment.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>Original GPA: {originalGPA.toFixed(2)}</div>
        </div>

        {/* Proposed enrollments table*/}
        <div className="col-md-6">
          <div className="h5 text-body-secondary">Proposed Courses</div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Course Prefix</th>
                <th scope="col">Course Number</th>
                <th scope="col">Credits</th>
                <th scope="col">Grade</th>
              </tr>
            </thead>
            <tbody>
              {proposedEnrollments?.map((enrollment, index) => (
                <tr key={index}>
                  <td>{enrollment.course.prefix}</td>
                  <td>{enrollment.course.number}</td>
                  <td>{enrollment.course.credits}</td>
                  <td>{enrollment.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>Proposed GPA: {proposedGPA.toFixed(2)}</div>
        </div>
      </div>

      {/* Add new enrollment form */}
      <div className="p-3">
        <div className="h5 text-body-secondary">Add a Course</div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="prefix">
                <Form.Label>Course Prefix</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter course prefix"
                  name="prefix"
                  value={newEnrollment?.course.prefix}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="number">
                <Form.Label>Course Number</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  placeholder="Enter course number"
                  name="number"
                  value={newEnrollment?.course.number}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="credits">
            <Form.Label>Credits</Form.Label>
            <Form.Control
              required
              type="number"
              min={0}
              placeholder="Number of credits"
              name="credits"
              value={newEnrollment?.course.credits}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="grade">
            <Form.Label>Grade</Form.Label>
            <Form.Select
              required
              value={newEnrollment?.grade}
              name="grade"
              onChange={handleInputChange}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
              <option value="S">S (Satisfied)</option>
              <option value="U">U (Unstatisfied)</option>
              <option value="I">I (Incomplete)</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit">Add Course</Button>
        </Form>
      </div>
    </>
  );
};

export default WhatIfAnalysisForm;
