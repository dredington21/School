import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { TestMajors, TestStudents } from "../testData";
import { Student } from "../types";

const StudentRoster = () => {
  const [majors, setMajors] = useState(
    // TODO: Get list of majors from database
    TestMajors
  );

  const getStudentsByMajor = (major: string): Student[] => {
    // TODO: query database for students by major
    return TestStudents;
  };

  return (
    <>
      <div className="display-6">Student Roster</div>
      <hr />
      <Accordion alwaysOpen>
        {/* Make an accordion item for each major */}
        {majors.map((major, index) => (
          <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>{major}</Accordion.Header>
            <Accordion.Body>
              {/* Student roster table*/}
              <div className="p-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">StudentID</th>
                      <th scope="col">Name</th>
                      <th scope="col">GPA</th>
                      <th scope="col">Total Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getStudentsByMajor(major).map((student) => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>
                          {student.firstName} {student.lastName}
                        </td>

                        <td>{student.gpa}</td>
                        <td>{student.totalCredits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default StudentRoster;
