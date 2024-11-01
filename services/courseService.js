const CourseRepository = require("../repository/courseRepository");

const CourseService = {
  createCourse: async (courseData) => {
    return await CourseRepository.create(courseData);
  },
  getCourseByID: async (courseID) => {
    return await CourseRepository.getCourseByID(courseID);
  },
};

module.exports = CourseService;
