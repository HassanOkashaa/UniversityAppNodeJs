const CourseRepository = require("../repository/courseRepository");

const CourseService = {
  createCourse: async (courseData) => {
    return await CourseRepository.create(courseData);
  },
};

module.exports = CourseService;
