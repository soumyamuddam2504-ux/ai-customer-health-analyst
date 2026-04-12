const db = require('./database');

function seed() {
  const count = db.prepare('SELECT COUNT(*) as c FROM customers').get();
  if (count.c > 0) return;

  const insert = db.prepare(`
    INSERT INTO customers
      (name, industry, csm, last_login_days_ago, usage_change_percent, support_tickets_count, nps_score, renewal_days_left, mrr, plan)
    VALUES
      (@name, @industry, @csm, @lastLoginDaysAgo, @usageChangePercent, @supportTicketsCount, @npsScore, @renewalDaysLeft, @mrr, @plan)
  `);

  const customers = [
    {
      name: 'ABC Corp',
      industry: 'SaaS',
      csm: 'Sarah Lee',
      lastLoginDaysAgo: 16,
      usageChangePercent: -32,
      supportTicketsCount: 5,
      npsScore: 4,
      renewalDaysLeft: 22,
      mrr: 4500,
      plan: 'Enterprise',
    },
    {
      name: 'Bright Solutions',
      industry: 'Healthcare',
      csm: 'James Carter',
      lastLoginDaysAgo: 2,
      usageChangePercent: 12,
      supportTicketsCount: 1,
      npsScore: 9,
      renewalDaysLeft: 180,
      mrr: 2200,
      plan: 'Growth',
    },
    {
      name: 'Nova Retail',
      industry: 'Retail',
      csm: 'Sarah Lee',
      lastLoginDaysAgo: 9,
      usageChangePercent: -18,
      supportTicketsCount: 3,
      npsScore: 6,
      renewalDaysLeft: 45,
      mrr: 1800,
      plan: 'Growth',
    },
    {
      name: 'Zenith Finance',
      industry: 'Finance',
      csm: 'Mike Patel',
      lastLoginDaysAgo: 0,
      usageChangePercent: 5,
      supportTicketsCount: 0,
      npsScore: 10,
      renewalDaysLeft: 210,
      mrr: 7500,
      plan: 'Enterprise',
    },
    {
      name: 'TechWave Inc',
      industry: 'Technology',
      csm: 'James Carter',
      lastLoginDaysAgo: 20,
      usageChangePercent: -40,
      supportTicketsCount: 6,
      npsScore: 3,
      renewalDaysLeft: 15,
      mrr: 3200,
      plan: 'Enterprise',
    },
    {
      name: 'GreenPath Logistics',
      industry: 'Logistics',
      csm: 'Mike Patel',
      lastLoginDaysAgo: 5,
      usageChangePercent: -8,
      supportTicketsCount: 2,
      npsScore: 7,
      renewalDaysLeft: 90,
      mrr: 1200,
      plan: 'Starter',
    },
    {
      name: 'Apex Media',
      industry: 'Media',
      csm: 'Sarah Lee',
      lastLoginDaysAgo: 1,
      usageChangePercent: 20,
      supportTicketsCount: 0,
      npsScore: 9,
      renewalDaysLeft: 300,
      mrr: 950,
      plan: 'Starter',
    },
    {
      name: 'CoreBridge Systems',
      industry: 'Technology',
      csm: 'Mike Patel',
      lastLoginDaysAgo: 12,
      usageChangePercent: -22,
      supportTicketsCount: 4,
      npsScore: 5,
      renewalDaysLeft: 28,
      mrr: 5100,
      plan: 'Enterprise',
    },
    {
      name: 'Lumen Education',
      industry: 'Education',
      csm: 'James Carter',
      lastLoginDaysAgo: 3,
      usageChangePercent: 8,
      supportTicketsCount: 1,
      npsScore: 8,
      renewalDaysLeft: 150,
      mrr: 800,
      plan: 'Growth',
    },
    {
      name: 'PeakOps',
      industry: 'Operations',
      csm: 'Sarah Lee',
      lastLoginDaysAgo: 18,
      usageChangePercent: -28,
      supportTicketsCount: 2,
      npsScore: null,
      renewalDaysLeft: 35,
      mrr: 2600,
      plan: 'Growth',
    },
  ];

  const insertMany = db.transaction((rows) => {
    for (const row of rows) insert.run(row);
  });
  insertMany(customers);

  console.log('Seeded 10 mock customers.');
}

module.exports = { seed };
