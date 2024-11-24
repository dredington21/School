import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AddDrop from "../components/AddDrop/AddDrop";
import StudentInfo from "../components/StudentInfo";
import WhatIf from "../components/WhatIf/WhatIf";

const Student = () => {
  // Check session storage for username
  const username = sessionStorage.getItem("username");
  const studentId = sessionStorage.getItem("studentId"); // Assuming studentId is stored in session storage

  // Redirect to login if username or studentId is not present (user not authenticated properly)
  if (!username || !studentId) {
    console.log("Redirecting to login");
    return <Navigate to="/login" />;
  }

  // Define pages and their respective routes
  const pages = ["Home", "Add/Drop", "What-If"];

  return (
    <>
      <div className="d-flex">
        {/* Sidebar with navigation links */}
        <Sidebar pages={pages} user={username} />

        {/* Main Content Area */}
        <div
          style={{
            marginLeft: "250px", // To account for sidebar width
            padding: "20px",
            width: "100%",
          }}
        >
          <Routes>
            {/* Define nested routes for student-specific pages */}
            <Route path="Home" element={<StudentInfo studentId={studentId} />} />
            <Route path="AddDrop" element={<AddDrop />} />
            <Route path="WhatIf" element={<WhatIf />} />
            {/* Redirect /student/ to /student/Home */}
            <Route path="/" element={<Navigate to="Home" />} />
            {/* Redirect unmatched routes to Home */}
            <Route path="*" element={<Navigate to="Home" />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Student;