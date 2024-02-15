const reviews = {
  events: {
    REQUEST_CHANGES: 'REQUEST_CHANGES',
    COMMENT: 'COMMENT',
    APPROVE: 'APPROVE',
  },
  states: {
    APPROVED: 'APPROVED',
    CHANGES_REQUESTED: 'CHANGES_REQUESTED',
    COMMENTED: 'COMMENTED',
    DISMISSED: 'DISMISSED',
    PENDING: 'PENDING',
  },
};

const activityTypes = {
  pull_request: {
    OPENED: 'opened',
    REOPENED: 'reopened',
    SYNCHRONIZE: 'synchronize',
    EDITED: 'edited',
    CLOSED: 'closed',
    MERGED: 'merged',
    READY_FOR_REVIEW: 'ready_for_review',
    LOCKED: 'locked',
    UNLOCKED: 'unlocked',
    REVIEW_REQUESTED: 'review_requested',
    REVIEW_REQUEST_REMOVED: 'review_request_removed',
    LABELED: 'labeled',
    UNLABELED: 'unlabeled',
    ASSIGNED: 'assigned',
    UNASSIGNED: 'unassigned',
    MILESTONED: 'milestoned',
    DEMILESTONED: 'demilestoned',
    HEAD_REF_DELETED: 'head_ref_deleted',
    HEAD_REF_RESTORED: 'head_ref_restored',
    CONVERTED_NOTE_TO_ISSUE: 'converted_note_to_issue',
    MOVED_COLUMNS_IN_PROJECT: 'moved_columns_in_project',
    COMMENT_DELETED: 'comment_deleted',
    REVIEW_DISMISSED: 'review_dismissed',
    REVIEW_REQUESTED_REMOVED: 'review_requested_removed',
  },
};

module.exports = { reviews, activityTypes };
