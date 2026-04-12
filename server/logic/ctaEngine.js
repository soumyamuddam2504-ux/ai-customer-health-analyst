function suggestCTA(customer, status) {
  const { renewal_days_left, last_login_days_ago, support_tickets_count } = customer;

  if (status === 'At Risk') {
    if (renewal_days_left <= 30) return 'Renewal Risk Intervention';
    if (last_login_days_ago >= 14) return 'At-Risk Customer Re-Engagement';
    return 'At-Risk Customer Follow-Up';
  }

  if (status === 'Warning') {
    if (renewal_days_left <= 60) return 'Pre-Renewal Health Check';
    if (support_tickets_count >= 2) return 'Support-Driven Outreach';
    return 'Low Usage Engagement Campaign';
  }

  // Good
  if (renewal_days_left <= 90) return 'Early Renewal Conversation';
  return 'Customer Advocacy / Upsell Opportunity';
}

module.exports = { suggestCTA };
