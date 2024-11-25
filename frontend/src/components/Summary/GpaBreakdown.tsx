import { useEffect, useState } from "react";

interface MajorGpa {
  major_name: string;
  max_gpa: string;
  average_gpa: string;
  min_gpa: string;
}

const GpaBreakdown = () => {
  const [GpaBreakdown, setGpaBreakdown] = useState<MajorGpa[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGpaBreakdown = async (deptId: number): Promise<MajorGpa[]> => {
    const response = await fetch(
      `http://localhost:3000/api/summaries/gpaBreakdown/${deptId}`
    );

    if (!response.ok)
      throw new Error(`Failed to fetch GPA breakdown: ${response.statusText}`);
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const deptId = sessionStorage.getItem("departmentId");
        const gpaBreakdown = await fetchGpaBreakdown(Number(deptId));
        setGpaBreakdown(gpaBreakdown);
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
              <th scope="col">Major</th>
              <th scope="col">High</th>
              <th scope="col">Average</th>
              <th scope="col">Low</th>
            </tr>
          </thead>
          <tbody>
            {GpaBreakdown.map((major) => {
              return (
                <tr key={major.major_name}>
                  <td>{major.major_name}</td>
                  <td>{Number(major.max_gpa).toFixed(2)}</td>
                  <td>{Number(major.average_gpa).toFixed(2)}</td>
                  <td>{Number(major.min_gpa).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GpaBreakdown;
