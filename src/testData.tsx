import { Course, Enrollment, Student } from "./types";

export const TestCourses: Course[] = [
  {
    id: 100,
    prefix: "COP",
    number: 4703,
    semester: "F",
    year: 2020,
    credits: 3,
    instructorId: "T2",
  },
  {
    id: 123,
    prefix: "CNT",
    number: 4104,
    semester: "S",
    year: 2019,
    credits: 4,
    instructorId: "T1",
  },
  {
    id: 206,
    prefix: "CIS",
    number: 3433,
    semester: "F",
    year: 2019,
    credits: 3,
    instructorId: "T4",
  },
];

export const TestEnrollments: Enrollment[] = [
  {
    course: TestCourses[0],
    grade: "A",
  },
  {
    course: TestCourses[1],
    grade: "B",
  },
  {
    course: TestCourses[2],
    grade: "U",
  },
];

export const TestStudents: Student[] = [
  {
    id: "U12",
    firstName: "Jane",
    lastName: "Smith",
    major: "CS",
    gpa: 3.9,
    totalCredits: 108,
  },
  {
    id: "U39",
    firstName: "John",
    lastName: "Doe",
    major: "CS",
    gpa: 3.7,
    totalCredits: 36,
  },
];

export const TestMajors: string[] = ["CS", "IT", "EE"];
