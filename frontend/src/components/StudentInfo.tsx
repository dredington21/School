import { useState, useEffect } from "react";
import { Enrollment, Student } from "../types";

const StudentInfo = ({ studentId }: { studentId: string }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [currentEnrollments, setCurrentEnrollments] = useState<Enrollment[]>([]);
  const [pastEnrollments, setPastEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  const fetchStudentInfo = async (id: string): Promise<Student> => {
    const response = await fetch(`http://localhost:3000/api/students/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch student info: ${response.statusText}`);
    return response.json();
  };
  
  const fetchCurrentEnrollments = async (id: string): Promise<Enrollment[]> => {
    const response = await fetch(`http://localhost:3000/api/enrollments/current/${id}`);
    console.log("fetchCurrentEnrollments response:", response);
    if (!response.ok) throw new Error(`Failed to fetch current enrollments: ${response.statusText}`);
    return response.json();
  };
  
  const fetchPastEnrollments = async (id: string): Promise<Enrollment[]> => {
    const response = await fetch(`http://localhost:3000/api/enrollments/past/${id}`);
    console.log("fetchPastEnrollments response:", response);
    if (!response.ok) throw new Error(`Failed to fetch past enrollments: ${response.statusText}`);
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [studentData, current, past] = await Promise.all([
          fetchStudentInfo(studentId),
          fetchCurrentEnrollments(studentId),
          fetchPastEnrollments(studentId),
        ]);
  
        console.log("Student Data:", studentData);
        console.log("Current Enrollments:", current);
        console.log("Past Enrollments:", past);
  
        setStudent(studentData);
        setCurrentEnrollments(current);
        setPastEnrollments(past);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [studentId]);

  if (loading) return <div className="spinner-border" role="status">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <>
      {/* Header */}
      <div className="display-6">Student Summary</div>
      <hr />

      {/* Student Info */}
      <div className="p-3 text-dark">
        <div>
          <b>Name: </b>
          {student?.firstName} {student?.lastName}
        </div>
        <div>
          <b>Student ID: </b>
          {student?.id}
        </div>
        <div>
          <b>Major: </b>
          {student?.major}
        </div>
        <div>
          <b>GPA: </b>
          {student?.gpa}
        </div>
      </div>

      {/* Current Enrollments */}
      <div className="p-3">
        <div className="h5 text-body-secondary">Current Enrollments</div>
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
            {currentEnrollments.map((enrollment, index) => (
              <tr key={index}>
                <td>{enrollment.course.prefix}</td>
                <td>{enrollment.course.number}</td>
                <td>
                  {enrollment.semester} {enrollment.yearTaken}
                </td>
                <td>{enrollment.course.credits}</td>
                <td>{enrollment.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Past Enrollments */}
      <div className="p-3">
        <div className="h5 text-body-secondary">Past Enrollments</div>
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
            {pastEnrollments.map((enrollment, index) => (
              <tr key={index}>
                <td>{enrollment.course.prefix}</td>
                <td>{enrollment.course.number}</td>
                <td>
                  {enrollment.semester} {enrollment.yearTaken}
                </td>
                <td>{enrollment.course.credits}</td>
                <td>{enrollment.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentInfo;
