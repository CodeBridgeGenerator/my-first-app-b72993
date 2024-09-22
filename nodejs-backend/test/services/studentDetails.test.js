const assert = require('assert');
const app = require('../../src/app');

describe('\'studentDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('studentDetails');

    assert.ok(service, 'Registered the service (studentDetails)');
  });
});
