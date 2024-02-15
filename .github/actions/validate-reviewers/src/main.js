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
    const slackHook = core.getInput('slack-hook-url', {
      required: true,
    });
    const octokit = github.getOctokit(token);
    const reviewers = await getConfig(configPath);
    const service = new Service(octokit, github.context, reviewers);
    const tasks = new Tasks(service);

    // Validate inputs
    await service.validate();

    // Notify team
    // await tasks.notifyTeam(slackHook);
    console.log(JSON.stringify(github.context, null, 2));

    // Validate reviewers
    await tasks.validateReviewers();

    core.info('All validations passed');
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;
