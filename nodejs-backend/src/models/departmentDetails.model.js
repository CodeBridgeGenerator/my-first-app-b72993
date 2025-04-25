
    module.exports = function (app) {
        const modelName = "department_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            departmentID: { type:  String , required: true, comment: "Department ID, p, false, true, true, true, true, true, true, , , , ," },
depName: { type:  String , required: true, comment: "DepName, p, false, true, true, true, true, true, true, , , , ," },
HOD: { type:  String , required: true, comment: "HOD, p, false, true, true, true, true, true, true, , , , ," },

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