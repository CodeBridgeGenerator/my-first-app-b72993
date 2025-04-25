const assert = require("assert");
const app = require("../../src/app");

describe("courseDetails service", () => {
  let thisService;
  let courseDetailCreated;

  beforeEach(async () => {
    thisService = await app.service("courseDetails");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (courseDetails)");
  });

  describe("#create", () => {
    const options = {"courseID":"new value","courseName":"new value","departmentID":"aasdfasdfasdfadsfadfa","Lecturer":"new value"};

    beforeEach(async () => {
      courseDetailCreated = await thisService.create(options);
    });

    it("should create a new courseDetail", () => {
      assert.strictEqual(courseDetailCreated.courseID, options.courseID);
assert.strictEqual(courseDetailCreated.courseName, options.courseName);
assert.strictEqual(courseDetailCreated.departmentID, options.departmentID);
assert.strictEqual(courseDetailCreated.Lecturer, options.Lecturer);
    });
  });

  describe("#get", () => {
    it("should retrieve a courseDetail by ID", async () => {
      const retrieved = await thisService.get(courseDetailCreated._id);
      assert.strictEqual(retrieved._id, courseDetailCreated._id);
    });
  });

  describe("#update", () => {
    let courseDetailUpdated;
    const options = {"courseID":"updated value","courseName":"updated value","departmentID":"345345345345345345345","Lecturer":"updated value"};

    beforeEach(async () => {
      courseDetailUpdated = await thisService.update(courseDetailCreated._id, options);
    });

    it("should update an existing courseDetail ", async () => {
      assert.strictEqual(courseDetailUpdated.courseID, options.courseID);
assert.strictEqual(courseDetailUpdated.courseName, options.courseName);
assert.strictEqual(courseDetailUpdated.departmentID, options.departmentID);
assert.strictEqual(courseDetailUpdated.Lecturer, options.Lecturer);
    });
  });

  describe("#delete", () => {
  let courseDetailDeleted;
    beforeEach(async () => {
      courseDetailDeleted = await thisService.remove(courseDetailCreated._id);
    });

    it("should delete a courseDetail", async () => {
      assert.strictEqual(courseDetailDeleted._id, courseDetailCreated._id);
    });
  });
});