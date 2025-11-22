# Compliance Evaluation Framework
## GDPR, CCPA & Privacy Compliance Checklist

**Purpose:** Evaluate every code change from a compliance standpoint

---

## Quick Compliance Checklist

### Data Collection
- [ ] Is data collection necessary for the feature?
- [ ] Is user consent obtained before collection?
- [ ] Is data collection clearly disclosed in privacy policy?
- [ ] Is data minimization principle followed?

### Data Storage
- [ ] Is data encrypted at rest?
- [ ] Is data encrypted in transit?
- [ ] Are retention periods defined?
- [ ] Can users access their data?
- [ ] Can users delete their data?

### Data Sharing
- [ ] Is third-party sharing disclosed?
- [ ] Is user consent obtained for sharing?
- [ ] Are data sharing agreements in place?
- [ ] Is sharing limited to necessary purposes?

### User Rights
- [ ] Can users access their data? (GDPR Art. 15)
- [ ] Can users correct their data? (GDPR Art. 16, CCPA)
- [ ] Can users delete their data? (GDPR Art. 17, CCPA)
- [ ] Can users export their data? (GDPR Art. 20)
- [ ] Can users opt-out of data sale? (CCPA)
- [ ] Can users limit sensitive data use? (CPRA)

### Location Data (Sensitive)
- [ ] Is location collection necessary?
- [ ] Is explicit consent obtained?
- [ ] Is location data encrypted?
- [ ] Is location sharing limited?
- [ ] Can users disable location tracking?
- [ ] Is location retention period defined?

### Security
- [ ] Are security measures implemented?
- [ ] Is access control in place?
- [ ] Are vulnerabilities addressed?
- [ ] Is incident response plan ready?

### Transparency
- [ ] Are data practices clearly disclosed?
- [ ] Is privacy policy up to date?
- [ ] Are users notified of changes?
- [ ] Is consent mechanism clear?

---

## Compliance Risk Levels

### 🔴 High Risk
- Location data collection without consent
- Data sharing without disclosure
- No user rights mechanisms
- Insufficient security

### 🟡 Medium Risk
- Data collection without clear purpose
- Extended retention periods
- Limited user controls
- Third-party integrations

### 🟢 Low Risk
- Anonymized data
- User-initiated actions
- Clear disclosures
- Strong security

---

## Evaluation Template

For each change, evaluate:

1. **What data is collected?**
2. **Is consent required?**
3. **How is data stored?**
4. **Who has access?**
5. **How long is data retained?**
6. **Can users control it?**
7. **Is it disclosed in privacy policy?**
8. **Are security measures adequate?**

---

**Use this framework for every code change!**

