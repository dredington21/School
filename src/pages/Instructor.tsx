import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Summary from "../components/Summary/Summary";
import InstructorInfo from "../components/InstructorInfo";

const Instructor = () => {
  let pages = ["Home", "Summary"];

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
            <Route path="Home" element={<InstructorInfo />} />
            <Route path="Summary" element={<Summary />} />
            <Route path="*" element={<Navigate to={"Home"} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Instructor;
