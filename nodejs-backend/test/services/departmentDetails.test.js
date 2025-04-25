const assert = require("assert");
const app = require("../../src/app");

describe("departmentDetails service", () => {
  let thisService;
  let departmentDetailCreated;

  beforeEach(async () => {
    thisService = await app.service("departmentDetails");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (departmentDetails)");
  });

  describe("#create", () => {
    const options = {"departmentID":"new value","depName":"new value","HOD":"new value"};

    beforeEach(async () => {
      departmentDetailCreated = await thisService.create(options);
    });

    it("should create a new departmentDetail", () => {
      assert.strictEqual(departmentDetailCreated.departmentID, options.departmentID);
assert.strictEqual(departmentDetailCreated.depName, options.depName);
assert.strictEqual(departmentDetailCreated.HOD, options.HOD);
    });
  });

  describe("#get", () => {
    it("should retrieve a departmentDetail by ID", async () => {
      const retrieved = await thisService.get(departmentDetailCreated._id);
      assert.strictEqual(retrieved._id, departmentDetailCreated._id);
    });
  });

  describe("#update", () => {
    let departmentDetailUpdated;
    const options = {"departmentID":"updated value","depName":"updated value","HOD":"updated value"};

    beforeEach(async () => {
      departmentDetailUpdated = await thisService.update(departmentDetailCreated._id, options);
    });

    it("should update an existing departmentDetail ", async () => {
      assert.strictEqual(departmentDetailUpdated.departmentID, options.departmentID);
assert.strictEqual(departmentDetailUpdated.depName, options.depName);
assert.strictEqual(departmentDetailUpdated.HOD, options.HOD);
    });
  });

  describe("#delete", () => {
  let departmentDetailDeleted;
    beforeEach(async () => {
      departmentDetailDeleted = await thisService.remove(departmentDetailCreated._id);
    });

    it("should delete a departmentDetail", async () => {
      assert.strictEqual(departmentDetailDeleted._id, departmentDetailCreated._id);
    });
  });
});