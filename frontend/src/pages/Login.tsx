import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "../types";

interface Props {
  onLogin: (username: string, role: Role, studentId: string) => void;
}

const Login = ({ onLogin }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("Login attempt:", username, password);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Response data:", data); // Log the response data

      if (data.success) {
        console.log("Calling onLogin");
        onLogin(data.studentId, data.role, data.studentId); // Pass studentId as username

        // Redirect based on role
        switch (data.role) {
          case "Student":
            console.log("Navigating to student page");
            navigate("/student");
            break;
          case "Staff":
            console.log("Navigating to staff page");
            navigate("/staff");
            break;
          case "Advisor":
            console.log("Navigating to advisor page");
            navigate("/advisor");
            break;
          case "Instructor":
            console.log("Navigating to instructor page");
            navigate("/instructor");
            break;
          default:
            console.error("Unknown role:", data.role);
        }
      } else {
        setErrorMessage(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      {/* Title header */}
      <div className="h3 p-3 text-primary text-center">
        Academic Data System
      </div>

      {/* Login form */}
      <div className="col-5 mx-auto" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {/* Password field */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Submit button */}
          <button type="submit" className="btn btn-primary d-flex mx-auto">
            Login
          </button>

          {/* Error message */}
          <div className="mt-3">
            {errorMessage && (
              <div className="alert alert-primary" role="alert">
                {errorMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;