const core = require('@actions/core');
const fetch = require('node-fetch');
const _ = require('lodash');
const { reviews, activityTypes } = require('./constants');

module.exports = class Tasks {
  constructor(service) {
    this.service = service;
  }

  async validateReviewers() {
    try {
      const listReviewers = await this.service.listReviews();
      const requestedReviewers = await this.service.listRequestedReviewers();
      const { reviewers } = this.service.getReviewers();

      const reviewersIncluded = listReviewers
        .filter(({ user }) => reviewers.includes(user.login));

      const reviewersRequestedIncluded = requestedReviewers
        .filter(({ login }) => reviewers.includes(login));

      if (!reviewersIncluded.length) {
        const submitDate = await this.service.createReview(
          reviews.events.REQUEST_CHANGES,
          'There are not reviewers included in the pull request, please add at least one authorized reviewer');

        core.info(`The review was created at ${submitDate}`);

        return;
      }

      const reviewersApproved = reviewersIncluded.filter(({ state }) => state === reviews.states.APPROVED);

      if (!reviewersApproved.length || reviewersRequestedIncluded.length) {
        const submitDate = await this.service.createReview(
          reviews.events.REQUEST_CHANGES,
          'One or more authorized reviewers have not approved the pull request, please wait for the approval of all reviewers');

        core.info(`The review was created at ${submitDate}`);

        return;
      }

      const submitDate = await this.service.createReview(
        reviews.events.APPROVE,
        'All authorized reviewers have approved the pull request, the current hotfix is ready to be merged');

      core.info(`The review was created at ${submitDate}`);

      core.info('The current hotfix is ready to be merged');
    } catch (error) {
      throw new Error(`Error validating requested reviewers with reviewers from config: ${error.message}`);
    }
  }

  async notifyTeam(slackHook) {
    try {
      const context = this.service.getContext();
      const action = _.get(context, 'payload.action');
      const { email } = await this.service.getUser();
      const body = {
        email: email,
        message: `${_.get(context, 'payload.pull_request.title')} - ${_.get(context, 'payload.pull_request.html_url')}`,
      };

    if (action === activityTypes.pull_request.OPENED) {
      await fetch(slackHook, {
        method: 'POST',
        body: JSON.stringify(body),
      });

      core.info('The team was notified about the new pull request');
    }

    } catch (error) {
      throw new Error(`Error notifying team: ${error.message}`);
    }
  }
}
