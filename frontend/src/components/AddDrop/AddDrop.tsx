import { useState } from "react";
import StudentIDSearch from "../StudentIDSearch";
import AddDropForm from "./AddDropForm";

const AddDrop = () => {
  const userRole = sessionStorage.getItem("userRole");
  const userID = sessionStorage.getItem("studentId");

  const [studentID, setStudentID] = useState(
    userRole === "Student" ? userID : "" // Set studentId value to the userId if user is a student
  );

  /**
   * Searches database for student associated with id value
   * TODO: search if entered id is associated with a student
   * @param id ID to search
   */
  const handleIDSearch = (id: string) => {
    setStudentID(id);
  };

  return (
    <>
      <div className="display-6">Add/Drop</div>
      <hr />
      {studentID ? (
        // If the studentId is set, show that student's add/drop form
        <AddDropForm studentID={studentID} />
      ) : (
        // Otherwise (if user is an advisor), show a studentId entry form first
        <StudentIDSearch onSearch={handleIDSearch} />
      )}
    </>
  );
};

export default AddDrop;
