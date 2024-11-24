import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AddDrop from "../components/AddDrop/AddDrop";
import Summary from "../components/Summary/Summary";
import WhatIf from "../components/WhatIf/WhatIf";

const Advisor = () => {
  let pages = ["Summary", "Add/Drop", "What-If"];

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
