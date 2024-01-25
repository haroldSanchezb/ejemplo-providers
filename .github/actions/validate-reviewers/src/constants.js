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

module.exports = { reviews };
