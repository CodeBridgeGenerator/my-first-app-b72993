const { createJobQueWorker } = require('./processJobQueues');
// const { createDynaLoaderQueWorker } = require('./processDynaLoaderQues');
const {
  createChangeForgotPasswordQueWorker,
} = require('./processChangeForgotPasswordQue');
const { createMailQueWorker } = require('./processEmails');
const { createUserProfile } = require('./processCreateUserProfile');

const createWorker = (app) => {
  createJobQueWorker(app);
  createMailQueWorker(app);
  createChangeForgotPasswordQueWorker(app);
  createUserProfile(app);
};

module.exports = createWorker;
