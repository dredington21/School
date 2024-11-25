import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

interface RosterStudent {
  major_name: string;
  student_id: string;
  first_name: string;
  last_name: string;
  GPA: number;
  total_credits: number;
}

const StudentRoster = () => {
  const [studentRoster, setStudentRoster] = useState<RosterStudent[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentRoster = async (
    deptId: number
  ): Promise<RosterStudent[]> => {
    const response = await fetch(
      `http://localhost:3000/api/summaries/studentRoster/${deptId}`
    );

    if (!response.ok)
      throw new Error(`Failed to fetch course history: ${response.statusText}`);
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const deptId = sessionStorage.getItem("departmentId");
        const roster = await fetchStudentRoster(Number(deptId));
        setStudentRoster(roster);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const majors = Array.from(
    new Set(studentRoster.map((item) => item.major_name))
  );
  const studentsGrouped = majors.map((major) =>
    studentRoster.filter((student) => student.major_name === major)
  );

  if (loading)
    return (
      <div className="spinner-border" role="status">
        Loading...
      </div>
    );
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

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
                    {studentsGrouped[index].map((student) => (
                      <tr key={student.student_id}>
                        <td>{student.student_id}</td>
                        <td>
                          {student.first_name} {student.last_name}
                        </td>

                        <td>{student.GPA}</td>
                        <td>{student.total_credits}</td>
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
