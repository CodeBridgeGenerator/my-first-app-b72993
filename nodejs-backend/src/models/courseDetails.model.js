
    module.exports = function (app) {
        const modelName = 'course_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            courseID: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
courseName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
departmentID: { type: Schema.Types.ObjectId, ref: "department_details" },
Lecturer: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
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