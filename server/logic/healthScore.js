function calculateHealthScore(customer) {
  const { last_login_days_ago, usage_change_percent, support_tickets_count, nps_score, renewal_days_left } = customer;

  let score = 100;

  // Login inactivity
  if (last_login_days_ago >= 14)      score -= 30;
  else if (last_login_days_ago >= 7)  score -= 15;

  // Usage change
  if (usage_change_percent <= -25)    score -= 25;
  else if (usage_change_percent <= -10) score -= 10;

  // Support tickets
  if (support_tickets_count > 3)      score -= 20;
  else if (support_tickets_count >= 2) score -= 10;

  // NPS
  if (nps_score !== null && nps_score !== undefined && nps_score <= 5) score -= 10;

  // Renewal risk — only penalise if already struggling
  if (renewal_days_left <= 30 && score < 60) score -= 15;

  score = Math.max(0, Math.min(100, score));

  let status;
  if (score >= 80)      status = 'Good';
  else if (score >= 50) status = 'Warning';
  else                  status = 'At Risk';

  return { score, status };
}

module.exports = { calculateHealthScore };
