const core = require('@actions/core');
const { reviews } = require('./constants');

module.exports = class Tasks {
  constructor(service) {
    this.service = service;
  }

  async validateReviewers() {
    try {
      const requestedReviewers = await this.service.listRequestedReviewers();
      const { reviewers } = this.service.getReviewers();

      const reviewersIncluded = requestedReviewers
        .filter(({ user }) => reviewers.includes(user.login));

      if (!reviewersIncluded.length) {
        const submitDate = await this.service.createReview(
          reviews.events.REQUEST_CHANGES,
          'There are not reviewers included in the pull request, please add at least one authorized reviewer');

        core.info(`The review was created at ${submitDate}`);

        return;
      }

      const reviewersApproved = reviewersIncluded.filter(({ state }) => state === reviews.states.APPROVED);

      if (!reviewersApproved.length) {
        const submitDate = await this.service.createReview(
          reviews.events.REQUEST_CHANGES,
          'One or more authorized reviewers have not approved the pull request, please wait for the approval of all reviewers');

        core.info(`The review was created at ${submitDate}`);

        return;
      }

      // const submitDate = await this.service.createReview(
      //   reviews.events.APPROVE,
      //   'All authorized reviewers have approved the pull request, the current hotfix is ready to be merged');

      // core.info(`The review was created at ${submitDate}`);

      core.info('The current hotfix is ready to be merged');
    } catch (error) {
      throw new Error(`Error validating requested reviewers with reviewers from config: ${error.message}`);
    }
  }
}
