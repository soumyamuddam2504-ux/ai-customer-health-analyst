function detectIssues(customer) {
  const { last_login_days_ago, usage_change_percent, support_tickets_count, nps_score, renewal_days_left } = customer;
  const issues = [];

  if (last_login_days_ago >= 14) {
    issues.push(`No login in ${last_login_days_ago} days — customer may be disengaged`);
  } else if (last_login_days_ago >= 7) {
    issues.push(`Low login activity — last seen ${last_login_days_ago} days ago`);
  }

  if (usage_change_percent <= -25) {
    issues.push(`Usage dropped ${Math.abs(usage_change_percent)}% — significant decline`);
  } else if (usage_change_percent <= -10) {
    issues.push(`Usage down ${Math.abs(usage_change_percent)}% — early warning sign`);
  }

  if (support_tickets_count > 3) {
    issues.push(`${support_tickets_count} open support tickets — high support burden`);
  } else if (support_tickets_count >= 2) {
    issues.push(`${support_tickets_count} support tickets open — moderate friction`);
  }

  if (nps_score !== null && nps_score !== undefined && nps_score <= 5) {
    issues.push(`NPS score is ${nps_score} — customer satisfaction is low`);
  }

  if (renewal_days_left <= 30) {
    issues.push(`Renewal in ${renewal_days_left} days — at risk of churn`);
  } else if (renewal_days_left <= 60) {
    issues.push(`Renewal in ${renewal_days_left} days — begin renewal conversation soon`);
  }

  return issues;
}

module.exports = { detectIssues };
