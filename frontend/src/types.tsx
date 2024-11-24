export interface Course {
  id: number;
  prefix: string;
  number: number;
  semester: string;
  //year: number;
  credits: number;
  instructorId: string;
}

export interface Enrollment {
  studentId: string; // Matches the 'student_id' field
  courseId: number;  // Matches the 'course_id' field
  semester: string;  // Matches the 'semester' field (e.g., 'F' for Fall, 'S' for Spring)
  yearTaken: number; // Matches the 'year_taken' field
  grade: string;     // Matches the 'grade' field (e.g., 'A', 'B', etc.)
  course: Course;    // Details of the course (assumes you have a Course interface defined)
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  major: string;
  gpa: number;
  totalCredits: number;
}

export type Role = "staff" | "advisor" | "student" | "instructor";

export const emptyCourse: Course = {
  id: 0,
  prefix: "",
  number: 0,
  semester: "",
  //year: 2000,
  credits: 0,
  instructorId: "",
};

export const emptyEnrollment: Enrollment = {
  course: emptyCourse,
  courseId: 0,
  grade: "A",
  semester: "F", // Example default semester (e.g., "F" for Fall)
  yearTaken: 2024, // Example default year
  studentId: "", // Empty string as a placeholder
};

