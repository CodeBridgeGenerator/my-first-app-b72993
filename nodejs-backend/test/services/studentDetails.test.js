const assert = require("assert");
const app = require("../../src/app");

describe("studentDetails service", () => {
  let thisService;
  let studentDetailCreated;

  beforeEach(async () => {
    thisService = await app.service("studentDetails");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (studentDetails)");
  });

  describe("#create", () => {
    const options = {"stuId":"new value","stuName":"new value","DOB":1745560276155,"courseID":"aasdfasdfasdfadsfadfa","address":"new value"};

    beforeEach(async () => {
      studentDetailCreated = await thisService.create(options);
    });

    it("should create a new studentDetail", () => {
      assert.strictEqual(studentDetailCreated.stuId, options.stuId);
assert.strictEqual(studentDetailCreated.stuName, options.stuName);
assert.strictEqual(studentDetailCreated.DOB, options.DOB);
assert.strictEqual(studentDetailCreated.courseID, options.courseID);
assert.strictEqual(studentDetailCreated.address, options.address);
    });
  });

  describe("#get", () => {
    it("should retrieve a studentDetail by ID", async () => {
      const retrieved = await thisService.get(studentDetailCreated._id);
      assert.strictEqual(retrieved._id, studentDetailCreated._id);
    });
  });

  describe("#update", () => {
    let studentDetailUpdated;
    const options = {"stuId":"updated value","stuName":"updated value","DOB":null,"courseID":"345345345345345345345","address":"updated value"};

    beforeEach(async () => {
      studentDetailUpdated = await thisService.update(studentDetailCreated._id, options);
    });

    it("should update an existing studentDetail ", async () => {
      assert.strictEqual(studentDetailUpdated.stuId, options.stuId);
assert.strictEqual(studentDetailUpdated.stuName, options.stuName);
assert.strictEqual(studentDetailUpdated.DOB, options.DOB);
assert.strictEqual(studentDetailUpdated.courseID, options.courseID);
assert.strictEqual(studentDetailUpdated.address, options.address);
    });
  });

  describe("#delete", () => {
  let studentDetailDeleted;
    beforeEach(async () => {
      studentDetailDeleted = await thisService.remove(studentDetailCreated._id);
    });

    it("should delete a studentDetail", async () => {
      assert.strictEqual(studentDetailDeleted._id, studentDetailCreated._id);
    });
  });
});