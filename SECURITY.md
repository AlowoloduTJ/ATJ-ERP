# Security Policy

## Supported Versions

The following versions of ATJ-ERP are currently being supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

**Note:** As this is an early-stage project (v0.1.0), we actively support the latest version. Security updates will be prioritized for the current release.

---

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability in ATJ-ERP, please report it responsibly.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:

1. **Email (Preferred):**
   - Send an email to: security@atj-erp.com (or your preferred security contact)
   - Subject: `[SECURITY] ATJ-ERP Vulnerability Report`
   - Include details about the vulnerability

2. **GitHub Security Advisory (If enabled):**
   - Go to: https://github.com/AlowoloduTJ/ATJ-ERP/security/advisories
   - Click "Report a vulnerability"
   - Fill out the security advisory form

### What to Include

When reporting a vulnerability, please include:

- **Description:** Clear description of the vulnerability
- **Impact:** Potential impact if exploited
- **Steps to Reproduce:** Detailed steps to reproduce the issue
- **Affected Components:** Which parts of the application are affected
- **Suggested Fix (Optional):** If you have ideas for how to fix it
- **Proof of Concept (Optional):** If you have a PoC, include it (but be careful not to include sensitive data)

### Response Timeline

- **Initial Response:** Within 48 hours of receiving your report
- **Status Update:** Within 7 days with an assessment
- **Resolution:** Depends on severity, but we aim for:
  - **Critical:** 24-48 hours
  - **High:** 1 week
  - **Medium:** 2-4 weeks
  - **Low:** Next scheduled release

### What to Expect

**If the vulnerability is accepted:**
- We will acknowledge receipt of your report
- We will work on a fix and keep you updated on progress
- We will credit you in the security advisory (if you wish)
- We will release a patch as soon as possible

**If the vulnerability is declined:**
- We will explain why it doesn't qualify as a security issue
- We may suggest reporting it as a regular bug report instead

**If the vulnerability is a duplicate:**
- We will let you know it's already being addressed
- We will credit you if you provided additional useful information

### Disclosure Policy

- **Private Disclosure:** We prefer to keep vulnerabilities private until a fix is ready
- **Coordinated Disclosure:** We will work with you to coordinate public disclosure
- **Credit:** We will credit you in security advisories (unless you prefer to remain anonymous)

---

## Security Best Practices

### For Users

- **Keep dependencies updated:** Regularly update your dependencies
- **Use environment variables:** Never commit secrets to version control
- **Enable Row Level Security (RLS):** Ensure RLS is enabled on all Supabase tables
- **Use HTTPS:** Always use HTTPS in production
- **Regular audits:** Run security audits on your dependencies

### For Contributors

- **Follow secure coding practices:**
  - Validate and sanitize all user input
  - Use parameterized queries (Supabase handles this)
  - Implement proper authentication checks
  - Follow the principle of least privilege

- **Code Review:**
  - All code changes require review
  - Security-sensitive changes require additional review
  - Test security-critical features thoroughly

- **Dependencies:**
  - Keep dependencies up to date
  - Review dependency changes for security implications
  - Use `npm audit` regularly

---

## Known Security Considerations

### Current Security Measures

✅ **Authentication:**
- Clerk authentication with secure session management
- Protected routes with middleware
- Row Level Security (RLS) for data isolation

✅ **Data Protection:**
- Environment variables for sensitive data
- No hardcoded secrets in code
- Proper `.gitignore` configuration

✅ **Dependencies:**
- Regular security audits
- Up-to-date dependencies
- No known vulnerabilities (as of last audit)

### Areas of Focus

- **Input Validation:** All user input should be validated
- **SQL Injection:** Using Supabase client prevents SQL injection
- **XSS Prevention:** React's built-in XSS protection
- **CSRF Protection:** Next.js provides CSRF protection
- **Session Security:** Clerk handles secure session management

---

## Security Updates

Security updates will be released as:
- **Patch versions** (0.1.x) for security fixes
- **Security advisories** on GitHub
- **Release notes** will include security-related changes

---

## Contact

For security-related questions or concerns:
- **Security Issues:** Use the reporting methods above
- **General Questions:** Open a GitHub discussion
- **Urgent Issues:** Email security@atj-erp.com (or your preferred security contact)

---

## Acknowledgments

We appreciate the security research community's efforts to keep software secure. Responsible disclosure helps us improve the security of ATJ-ERP for everyone.

---

**Last Updated:** 2026-01-07  
**Policy Version:** 1.0
