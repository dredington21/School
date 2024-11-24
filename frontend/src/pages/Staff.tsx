import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Summary from "../components/Summary/Summary";
import ModifyCourses from "../components/ModifyCourses/ModifyCourses";
import StudentRoster from "../components/StudentRoster";

const Staff = () => {
  let pages = ["Summary", "Modify Courses", "Student Roster"];

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
          <Routes>
            <Route path="Summary" element={<Summary />} />
            <Route path="ModifyCourses" element={<ModifyCourses />} />
            <Route path="StudentRoster" element={<StudentRoster />} />
            <Route path="*" element={<Navigate to={"Summary"} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Staff;
