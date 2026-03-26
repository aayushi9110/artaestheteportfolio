# Booking Submit Lambda

API Gateway POST Lambda handler for booking enquiries.

## Runtime
- Node.js 20.x

## Files
- `index.mjs`: Lambda handler source
- `package.json`: SES v2 dependency
- `OPERATIONS.md`: Ongoing configuration, environment management, and troubleshooting runbook

## Required Environment Variables
- `SES_FROM_EMAIL`: Verified SES sender (for example: noreply@yourdomain.com)
- `SES_TO_EMAIL`: Recipient inbox where enquiries are delivered
- `CORS_ALLOW_ORIGIN`: Exact allowed frontend origin (for example: `https://www.yourdomain.com`)

## Optional Environment Variables
- `RATE_LIMIT_WINDOW_MS`: Rolling rate-limit window in milliseconds (default `600000`)
- `RATE_LIMIT_MAX_PER_IP`: Max submissions per IP per window (default `8`)
- `RATE_LIMIT_MAX_PER_EMAIL`: Max submissions per email per window (default `3`)
- `RATE_LIMIT_MIN_INTERVAL_MS`: Minimum time between submissions from the same IP (default `15000`)
- `RATE_LIMIT_MAX_KEYS`: Max in-memory keys before old limiter entries are cleaned up (default `1500`)

## Frontend Contract
This handler accepts the payload currently sent by the booking page in `src/pages/Book/Book.tsx`:

```json
{
  "projectTypes": ["Interior Design"],
  "spaces": ["Living Room"],
  "aesthetics": ["Warm & Organic"],
  "budget": "GBP2,000-GBP5,000 / USD2,500-USD6,500",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "location": "New York",
  "details": "Need help with layout and sourcing.",
  "source": "Instagram",
  "submittedAt": "2026-03-18T10:00:00.000Z",
  "pagePath": "/book",
  "pageUrl": "https://example.com/book",
  "timezone": "America/New_York",
  "userAgent": "Mozilla/5.0 ..."
}
```

## Responses
- `200`: `{ "message": "Booking enquiry sent successfully." }`
- `400`: `{ "message": "Validation failed", "errors": ["..."] }`
- `429`: `{ "message": "Too many requests. Please wait before submitting again." }`
- `500`: `{ "message": "Internal server error while sending booking enquiry." }`

## Notes on Rate Limiting
- This limiter is in-memory and best-effort for Lambda runtime instances.
- For strict global limits across all concurrent Lambda instances, add API Gateway throttling and/or AWS WAF rules.

## Quick Deploy (Zip)
1. `cd lambda/booking-submit`
2. `npm install`
3. `zip -r function.zip index.mjs package.json package-lock.json node_modules`
4. Upload `function.zip` to AWS Lambda
5. Set handler to `index.handler`
6. Add API Gateway POST route and enable CORS

## IAM Permissions
Attach SES send permission to Lambda role, for example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ses:SendEmail", "ses:SendRawEmail"],
      "Resource": "*"
    }
  ]
}
```
