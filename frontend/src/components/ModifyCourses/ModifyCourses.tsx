import { useState } from "react";
import { Button } from "react-bootstrap";
import ModifyCourseForm from "./ModifyCourseForm";
import { Course } from "../../types";
import { TestCourses } from "../../testData";

const ModifyCourses = () => {
  // Courses in user's department
  const [deptCourses, setDeptCourses] = useState<Course[]>(
    //TODO: Get courses for user's department
    TestCourses
  );
  const [showForm, setShowForm] = useState(false); // Whether to show modal form for modifying course info
  const [editCourse, setEditCourse] = useState<Course | null>(null); // Course currently being edited

  /**
   * Handles clicking on edit button
   * @param course Course being edited (so the form can be prefilled with its info)
   */
  const handleEditClick = (course: Course | null) => {
    setEditCourse(course);
    setShowForm(true); // Diplay edit form
  };

  /**
   * Handles saving course modifications
   * TODO: update course edits in database
   * @param updatedCourse New data for edited course
   */
  const handleSave = (updatedCourse: Course) => {
    // TODO: change course in database
    handleClose();
  };

  /**
   * Closes editing form
   */
  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="display-6">Modify Courses</div>
      <hr />
      {/* Department courses table*/}
      <div className="p-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course ID</th>
              <th scope="col">Course Prefix</th>
              <th scope="col">Course Number</th>
              <th scope="col">Credits</th>
              <th scope="col">Instructor</th>
              <th scope="col">Edit Course Details</th>
            </tr>
          </thead>
          <tbody>
            {deptCourses?.map((course, index) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.prefix}</td>
                <td>{course.number}</td>
                <td>{course.credits}</td>
                <td>{course.instructorId}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      handleEditClick(deptCourses[index]);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button for adding new course */}
      <div className="p-3">
        <Button
          onClick={() => {
            handleEditClick(null);
          }}
        >
          Add New Course
        </Button>
      </div>

      {/* Modify course form shows if showForm==true */}
      <ModifyCourseForm
        show={showForm}
        course={editCourse}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
};

export default ModifyCourses;
