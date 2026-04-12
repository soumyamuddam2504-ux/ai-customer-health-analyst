const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');
const { calculateHealthScore } = require('../logic/healthScore');
const { detectIssues } = require('../logic/issueDetector');
const { recommendActions } = require('../logic/actionEngine');
const { suggestCTA } = require('../logic/ctaEngine');
const { generateEmail } = require('../logic/emailGenerator');

const router = express.Router();

// GET /api/customers/search?name=ABC Corp
router.get('/search', requireAuth, (req, res) => {
  const { name } = req.query;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Customer name is required.' });
  }

  const customer = db
    .prepare('SELECT * FROM customers WHERE LOWER(name) LIKE LOWER(?)')
    .get(`%${name.trim()}%`);

  if (!customer) {
    return res.status(404).json({ error: `No customer found matching "${name}".` });
  }

  const { score, status } = calculateHealthScore(customer);
  const issues = detectIssues(customer);
  const actions = recommendActions(customer, issues);
  const cta = suggestCTA(customer, status);
  const email = generateEmail(customer, issues, actions, status);

  res.json({
    customer: {
      id: customer.id,
      name: customer.name,
      industry: customer.industry,
      csm: customer.csm,
      plan: customer.plan,
      mrr: customer.mrr,
      renewalDaysLeft: customer.renewal_days_left,
      lastLoginDaysAgo: customer.last_login_days_ago,
      usageChangePercent: customer.usage_change_percent,
      supportTicketsCount: customer.support_tickets_count,
      npsScore: customer.nps_score,
    },
    health: { score, status },
    issues,
    actions,
    cta,
    email,
  });
});

// GET /api/customers — list all
router.get('/', requireAuth, (req, res) => {
  const customers = db.prepare('SELECT * FROM customers ORDER BY name ASC').all();
  res.json({ customers });
});

module.exports = router;
