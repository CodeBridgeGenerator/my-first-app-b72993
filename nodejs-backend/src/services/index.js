
const studentDetails = require("./studentDetails/studentDetails.service.js");
const courseDetails = require("./courseDetails/courseDetails.service.js");
const departmentDetails = require("./departmentDetails/departmentDetails.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    
  app.configure(studentDetails);
  app.configure(courseDetails);
  app.configure(departmentDetails);
    // ~cb-add-configure-service-name~
};
