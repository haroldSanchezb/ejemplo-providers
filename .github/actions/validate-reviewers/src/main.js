const core = require('@actions/core');
const github = require('@actions/github');
const getConfig = require('./config');
const Service = require('./service');
const Tasks = require('./tasks');

async function run() {
  try {
    const token = core.getInput('repo-token', { required: true });
    const configPath = core.getInput('configuration-path', {
      required: true,
    });

    const octokit = github.getOctokit(token);
    const reviewers = await getConfig(configPath);
    const service = new Service(octokit, github.context, reviewers);
    const tasks = new Tasks(service);

    console.log(JSON.stringify(github, undefined, 2));

    // Validate inputs
    await service.validate();

    // Validate reviewers
    await tasks.validateReviewers();

    core.info('All validations passed');
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;
