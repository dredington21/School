import { useEffect, useState } from "react";

interface DeptGpa {
  department_name: string;
  average_gpa: number;
}

const DepartmentRanking = () => {
  const [gpaRanking, setgpaRanking] = useState<DeptGpa[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeptGPA = async (): Promise<DeptGpa[]> => {
    const response = await fetch(
      `http://localhost:3000/api/summaries/gpaRanking`
    );
    if (!response.ok)
      throw new Error(`Failed to fetch average GPA: ${response.statusText}`);
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const gpaRanking = await fetchDeptGPA();
        setgpaRanking(gpaRanking);
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
              <th scope="col">Department</th>
              <th scope="col">Average GPA</th>
            </tr>
          </thead>
          <tbody>
            {gpaRanking.map((dept) => (
              <tr key={dept.department_name}>
                <td>{dept.department_name}</td>
                <td>{Number(dept.average_gpa).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DepartmentRanking;
