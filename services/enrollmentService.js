// services/enrollmentService.js
const EnrollmentRepository = require("../repository/enrollmentRepository");
const StudentRepository = require("../repository/studentRepository");

const EnrollmentService = {
  enrollStudentInCourse: async (studentID, courseID) => {
    // console.log(studentID, courseID);
    // const student = await StudentRepository.getByID(studentID);
    // console.log(student);
    // if (!student) {
    //   throw new Error("Student not found");
    // }
    const isEnrolled = await EnrollmentRepository.isStudentEnrolled(
      studentID,
      courseID
    );
    console.log(isEnrolled);
    if (isEnrolled) {
      throw new Error("Student is already enrolled in the course");
    }
    // console.log(studentID, courseID);
    await EnrollmentRepository.enrollStudent(studentID, courseID);
  },
};

module.exports = EnrollmentService;
