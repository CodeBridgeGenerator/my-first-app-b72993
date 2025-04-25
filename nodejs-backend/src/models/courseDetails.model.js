
    module.exports = function (app) {
        const modelName = "course_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            courseID: { type:  String , required: true, comment: "CourseID, p, false, true, true, true, true, true, true, , , , ," },
courseName: { type:  String , required: true, comment: "CourseName, p, false, true, true, true, true, true, true, , , , ," },
departmentID: { type: Schema.Types.ObjectId, ref: "department_details", comment: "DepartmentID, dropdown, false, true, true, true, true, true, true, departmentDetails, department_details, one-to-one, departmentID," },
Lecturer: { type:  String , required: true, comment: "Lecturer, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };