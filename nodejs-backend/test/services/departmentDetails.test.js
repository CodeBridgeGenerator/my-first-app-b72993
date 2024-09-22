const assert = require('assert');
const app = require('../../src/app');

describe('\'departmentDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('departmentDetails');

    assert.ok(service, 'Registered the service (departmentDetails)');
  });
});
