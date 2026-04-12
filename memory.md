# 🧠 Application Memory (Domain Logic)

## 📌 Overview

This application simulates a Customer Success AI Assistant that analyzes customer health and provides actionable recommendations.

---

## 👤 Customer Data Model (Phase 1 - Mock Data)

Each customer contains:

* name
* lastLoginDaysAgo
* usageChangePercent
* supportTicketsCount
* NPSScore (optional)
* renewalDaysLeft

---

## 📊 Health Scoring Logic

Health score is calculated based on:

### 🔴 Risk Indicators

* No login for 14+ days
* Usage drop > 25%
* High support tickets (>3)
* Renewal within 30 days + low activity

### 🟡 Warning Indicators

* Login inactivity 7–14 days
* Slight usage drop (10–25%)
* Moderate support activity

### 🟢 Healthy Indicators

* Active usage
* Stable or increasing usage
* Low/no support tickets

---

## 📈 Health Output

Health Score:

* 80–100 → 🟢 Good
* 50–79 → 🟡 Warning
* <50 → 🔴 At Risk

---

## ⚠️ Issue Detection

System identifies:

* Inactivity trends
* Usage decline
* Support burden
* Renewal risk

---

## ✅ Recommended Actions

Based on issues:

* Schedule customer call
* Share training resources
* Provide product walkthrough
* Escalate to support if needed

---

## 📌 CTA (Call-To-Action)

Examples:

* "At-risk customer follow-up"
* "Renewal risk intervention"
* "Low usage engagement campaign"

---

## 📧 Email Generation Logic

Email includes:

* Acknowledgement
* Identified concern
* Help offered
* Clear next step

Tone:

* Professional
* Supportive
* Action-oriented

---

## 🚀 Future Enhancements

* Real Gainsight API integration
* Automated CTA creation in Gainsight
* AI-powered health scoring (ML-based)
* Predictive churn modeling
