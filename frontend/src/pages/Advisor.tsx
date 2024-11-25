import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AddDrop from "../components/AddDrop/AddDrop";
import Summary from "../components/Summary/Summary";
import WhatIf from "../components/WhatIf/WhatIf";
import { useEffect, useState } from "react";

const Advisor = () => {
  let pages = ["Summary", "Add/Drop", "What-If"];

  const [departmentId, setDepartmentId] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeptGPA = async (): Promise<number> => {
    const userId = sessionStorage.getItem("username");
    const response = await fetch(
      `http://localhost:3000/api/advisors/department/${userId}`
    );
    if (!response.ok)
      throw new Error(`Failed to fetch department ID: ${response.statusText}`);
    const data = await response.json();
    return data.department_id;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const deptId = await fetchDeptGPA();
        setDepartmentId(deptId);
        sessionStorage.setItem("departmentId", deptId.toString());
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
      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar
          pages={pages}
          user={sessionStorage.getItem("username") as string}
        />

        {/* Main Content */}
        <div
          style={{
            marginLeft: "250px",
            padding: "20px",
            width: "100%",
          }}
        >
          {/* Display main content */}
          <Routes>
            <Route path="Summary" element={<Summary />} />
            <Route path="AddDrop" element={<AddDrop />} />
            <Route path="WhatIf" element={<WhatIf />} />
            <Route path="*" element={<Navigate to={"Summary"} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Advisor;
