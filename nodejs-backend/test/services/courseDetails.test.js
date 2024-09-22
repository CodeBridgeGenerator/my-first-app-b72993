const assert = require('assert');
const app = require('../../src/app');

describe('\'courseDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('courseDetails');

    assert.ok(service, 'Registered the service (courseDetails)');
  });
});
