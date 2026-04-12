function recommendActions(customer, issues) {
  const actions = [];
  const { last_login_days_ago, usage_change_percent, support_tickets_count, renewal_days_left } = customer;

  if (last_login_days_ago >= 14) {
    actions.push('Schedule an immediate check-in call with the customer');
    actions.push('Send a re-engagement email with value highlights');
  } else if (last_login_days_ago >= 7) {
    actions.push('Reach out via email to check on product adoption');
  }

  if (usage_change_percent <= -25) {
    actions.push('Share targeted training resources and use-case guides');
    actions.push('Offer a product walkthrough session');
  } else if (usage_change_percent <= -10) {
    actions.push('Share tips to improve usage of key features');
  }

  if (support_tickets_count > 3) {
    actions.push('Escalate to senior support — high ticket volume needs attention');
    actions.push('Review open tickets and proactively resolve blockers');
  } else if (support_tickets_count >= 2) {
    actions.push('Follow up on open support tickets to reduce friction');
  }

  if (renewal_days_left <= 30) {
    actions.push('Initiate renewal conversation immediately');
    actions.push('Prepare a business value review (QBR) to justify renewal');
  } else if (renewal_days_left <= 60) {
    actions.push('Begin renewal outreach and discuss contract options');
  }

  if (actions.length === 0) {
    actions.push('Continue regular check-ins to maintain engagement');
    actions.push('Share product updates and new feature announcements');
  }

  // Deduplicate
  return [...new Set(actions)];
}

module.exports = { recommendActions };
