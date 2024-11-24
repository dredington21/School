import { useState } from "react";
import { TestCourses } from "../testData";
import { Course } from "../types";

interface StudentCount {
  major: string;
  count: number;
}

const InstructorInfo = () => {
  const [currentCourses, setCurrentCourses] = useState<Course[]>(
    // TODO: Get instructor's past courses from the database
    [TestCourses[0]]
  );

  const [pastCourses, setSastCourses] = useState<Course[]>(
    // TODO: Get instructor's current courses from the database
    TestCourses.slice(1)
  );

  const [totalStudents, setTotalStudents] = useState<StudentCount[]>(
    // TODO: Get student counts from the database
    [
      { major: "CS", count: 21 },
      { major: "IT", count: 15 },
    ]
  );

  return (
    <>
      <div className="display-6">Instructor Summary</div>
      <hr />
      {/* Current courses table*/}
      <div className="p-3">
        <div className="h5 text-body-secondary">Current courses</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course Prefix</th>
              <th scope="col">Course Number</th>
              <th scope="col">Semester</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses?.map((course, index) => (
              <tr key={index}>
                <td>{course.prefix}</td>
                <td>{course.number}</td>
                <td>
                  {course.semester}
                  {course.year}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Past courses table */}
      <div className="p-3">
        <div className="h5 text-body-secondary">Past courses</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course Prefix</th>
              <th scope="col">Course Number</th>
              <th scope="col">Semester</th>
            </tr>
          </thead>
          <tbody>
            {pastCourses?.map((course, index) => (
              <tr key={index}>
                <td>{course.prefix}</td>
                <td>{course.number}</td>
                <td>
                  {course.semester}
                  {course.year}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Students breakdown table */}
      <div className="p-3">
        <div className="h5 text-body-secondary">Total Students</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Major</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {totalStudents?.map((count, index) => (
              <tr key={index}>
                <td>{count.major}</td>
                <td>{count.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InstructorInfo;
