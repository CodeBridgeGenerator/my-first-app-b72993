
    module.exports = function (app) {
        const modelName = "student_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            stuId: { type:  String , required: true, comment: "StuId, p, false, true, true, true, true, true, true, , , , ," },
stuName: { type:  String , required: true, comment: "StuName, p, false, true, true, true, true, true, true, , , , ," },
DOB: { type: Date, comment: "DOB, calendar, false, true, true, true, true, true, true, , , , ," },
courseID: { type: Schema.Types.ObjectId, ref: "course_details", comment: "CourseID, dropdown, false, true, true, true, true, true, true, courseDetails, course_details, one-to-one, courseID," },
address: { type:  String , required: true, comment: "Address, p, false, true, true, true, true, true, true, , , , ," },

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