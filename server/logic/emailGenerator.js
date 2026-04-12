function generateEmail(customer, issues, actions, status) {
  const { name, csm } = customer;
  const firstName = name.split(' ')[0];

  let opening = '';
  let body = '';
  let closing = '';

  if (status === 'At Risk') {
    opening = `I hope you're doing well. I wanted to personally reach out as I noticed some recent changes in your usage of our platform and wanted to check in.`;
    body = issues.length > 0
      ? `Specifically, I noticed:\n${issues.map(i => `  • ${i}`).join('\n')}\n\nI want to make sure you're getting full value from the platform and address anything that might be causing friction.`
      : `I noticed some activity changes and want to make sure everything is going smoothly on your end.`;
    const actionLine = actions[0] ? `I'd love to ${actions[0].toLowerCase()}.` : "I'd love to connect.";
    closing = `${actionLine} Would you be available for a quick 20-minute call this week?\n\nPlease feel free to reply to this email or book a time directly: [Calendar Link]`;
  } else if (status === 'Warning') {
    opening = `I wanted to touch base and see how things are going with the platform.`;
    body = issues.length > 0
      ? `I noticed a few things worth discussing:\n${issues.map(i => `  • ${i}`).join('\n')}\n\nI have some resources and tips that I think could help.`
      : `I want to make sure you're getting the most out of the product and answer any questions you might have.`;
    closing = `Would you be open to a short call or email exchange to go over a few things? I'm here to help.\n\n[Calendar Link]`;
  } else {
    opening = `I hope things are going great! I just wanted to check in and share some exciting updates.`;
    body = `Your team has been doing a great job with the platform. I wanted to make sure you're aware of some new features that could add even more value for your use case.`;
    closing = `If you ever want to explore additional features or discuss expanding your usage, I'd love to connect. Feel free to reply or book time here: [Calendar Link]`;
  }

  const email = `Subject: Checking In — ${name}

Hi ${firstName},

${opening}

${body}

${closing}

Best regards,
${csm}
Customer Success Manager`;

  return email;
}

module.exports = { generateEmail };
