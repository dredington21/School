import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface Props {
  onSearch: (id: string) => void;
}

const StudentIDSearch = ({ onSearch }: Props) => {
  const [inputID, setInputID] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(inputID);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="h5 text-body-secondary">Enter Student's ID</div>
        <Form.Group className="mb-3" controlId="studentID">
          <Form.Control
            type="text"
            value={inputID}
            placeholder="Student ID"
            onChange={(e) => setInputID(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Search student
        </Button>
      </Form>
    </>
  );
};

export default StudentIDSearch;
