import { useEffect, useState } from "react";

interface CourseOffering {
  course_prefix: string;
  course_number: number;
  semester: string;
  year_taken: number;
  total_enrollments: number;
  avg_grade: number;
}

const OfferingHistory = () => {
  const [offeringHistory, setofferingHistory] = useState<CourseOffering[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseHistory = async (
    deptId: number
  ): Promise<CourseOffering[]> => {
    const response = await fetch(
      `http://localhost:3000/api/summaries/courseHistory/${deptId}`
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
        const courseHistory = await fetchCourseHistory(Number(deptId));
        setofferingHistory(courseHistory);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="spinner-border" role="status">
        Loading...
      </div>
    );
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Semester</th>
              <th scope="col">Total Enrollments</th>
              <th scope="col">Average Grade</th>
            </tr>
          </thead>
          <tbody>
            {offeringHistory.map((course, index) => {
              return (
                <tr key={index}>
                  <td>
                    {course.course_prefix}
                    {course.course_number}
                  </td>
                  <td>
                    {course.semester}
                    {course.year_taken}
                  </td>
                  <td>{course.total_enrollments}</td>
                  <td>{Number(course.avg_grade).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OfferingHistory;
