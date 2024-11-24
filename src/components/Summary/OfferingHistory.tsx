const OfferingHistory = () => {
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
            <tr>
              <td>CEN4020</td>
              <td>F2024</td>
              <td>60</td>
              <td>3.0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OfferingHistory;
