const _ = require('lodash');

module.exports = class Service {
  constructor(octokit, context, reviewers) {
    this.octokit = octokit;
    this.context = context;
    this.reviewers = reviewers;

    this.repo = _.get(this.context, 'payload.pull_request.head.repo.name');
    this.owner = _.get(this.context, 'payload.pull_request.head.user.login');
    this.pullNumber = _.get(this.context, 'payload.pull_request.number');
  }

  validate() {
    if (!Object.keys(this.reviewers).length) {
      throw new Error('There are not reviewers configured');
    }

    if (!this.octokit) {
      throw new Error('whe have a issue with the octokit');
    }

    if (!this.context.payload.pull_request) {
      throw new Error('the webhook payload is not exist');
    }
  }

  async listRequestedReviewers() {
    try {
      const { data: reviewers } = await this.octokit.rest.pulls.listReviews({
        repo: this.repo,
        owner: this.owner,
        pull_number: this.pullNumber,
      });

      return reviewers;
    } catch (error) {
      throw new Error(`Error listing the requested reviewers: ${error.message}`);
    }
  }

  async createReview(event, body) {
    try {
      const { data } = await this.octokit.rest.pulls.createReview({
        repo: this.repo,
        owner: this.owner,
        pull_number: this.pullNumber,
        event: event,
        body: body,
      });

      return data.submitted_at;

    } catch (error) {
      throw new Error(`Error creating the review: ${error.message}`);
    }
  }

  getContext() {
    return this.context;
  }

  getReviewers() {
    return this.reviewers;
  }
}
