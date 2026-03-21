import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

const ses = new SESv2Client({ region: process.env.AWS_REGION || 'us-east-1' });

const REQUIRED_ENV_VARS = ['SES_FROM_EMAIL', 'SES_TO_EMAIL'];

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.CORS_ALLOW_ORIGIN || '*',
  'Access-Control-Allow-Headers': 'Content-Type,x-api-key',
  'Access-Control-Allow-Methods': 'OPTIONS,POST',
  'Content-Type': 'application/json'
};

const getSafeArray = (value) =>
  Array.isArray(value)
    ? value.filter((item) => typeof item === 'string').map((item) => item.trim()).filter(Boolean)
    : [];

const getSafeString = (value) => (typeof value === 'string' ? value.trim() : '');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePayload = (payload) => {
  const data = payload ?? {};

  const name = getSafeString(data.name);
  const email = getSafeString(data.email);
  const location = getSafeString(data.location);

  const errors = [];

  if (name.length < 2) {
    errors.push('Name must be at least 2 characters.');
  }

  if (!isValidEmail(email)) {
    errors.push('A valid email is required.');
  }

  if (location.length < 2) {
    errors.push('Location must be at least 2 characters.');
  }

  if (getSafeArray(data.projectTypes).length === 0) {
    errors.push('At least one project type is required.');
  }

  if (getSafeArray(data.spaces).length === 0) {
    errors.push('At least one space selection is required.');
  }

  if (getSafeArray(data.aesthetics).length === 0) {
    errors.push('At least one aesthetic selection is required.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    normalized: {
      projectTypes: getSafeArray(data.projectTypes),
      spaces: getSafeArray(data.spaces),
      aesthetics: getSafeArray(data.aesthetics),
      budget: getSafeString(data.budget),
      name,
      email,
      location,
      details: getSafeString(data.details),
      source: getSafeString(data.source),
      submittedAt: getSafeString(data.submittedAt) || new Date().toISOString(),
      pagePath: getSafeString(data.pagePath),
      pageUrl: getSafeString(data.pageUrl),
      timezone: getSafeString(data.timezone),
      userAgent: getSafeString(data.userAgent)
    }
  };
};

const checkRequiredEnv = () => {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
};

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const toHtmlList = (items) => {
  if (!items.length) {
    return '<li>None</li>';
  }

  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
};

const toTextList = (items) => {
  if (!items.length) {
    return '  - None';
  }

  return items.map((item) => `  - ${item}`).join('\n');
};

const renderHtmlDetailRow = (label, value) => `
  <tr>
    <td style="padding: 10px 0; width: 170px; vertical-align: top; color: #6b7280; font-weight: 600;">${label}</td>
    <td style="padding: 10px 0; color: #111827;">${value}</td>
  </tr>
`;

const buildEmailContent = (payload) => {
  const safe = {
    name: escapeHtml(payload.name),
    email: escapeHtml(payload.email),
    location: escapeHtml(payload.location),
    budget: escapeHtml(payload.budget || 'Not provided'),
    details: escapeHtml(payload.details || 'Not provided'),
    source: escapeHtml(payload.source || 'Not provided'),
    submittedAt: escapeHtml(payload.submittedAt || 'Not provided'),
    pagePath: escapeHtml(payload.pagePath || 'Not provided'),
    pageUrl: escapeHtml(payload.pageUrl || 'Not provided'),
    timezone: escapeHtml(payload.timezone || 'Not provided'),
    userAgent: escapeHtml(payload.userAgent || 'Not provided')
  };

  const subject = `New Booking Enquiry from ${safe.name}`;

  const textBody = [
    'NEW BOOKING ENQUIRY',
    '',
    `Name: ${safe.name}`,
    `Email: ${safe.email}`,
    `Location: ${safe.location}`,
    '',
    'Project Types:',
    toTextList(payload.projectTypes),
    '',
    'Spaces:',
    toTextList(payload.spaces),
    '',
    'Aesthetics:',
    toTextList(payload.aesthetics),
    '',
    `Budget: ${safe.budget}`,
    `Details: ${safe.details}`,
    `Source: ${safe.source}`,
    '',
    'Meta',
    '----',
    `Submitted At: ${safe.submittedAt}`,
    `Page Path: ${safe.pagePath}`,
    `Page URL: ${safe.pageUrl}`,
    `Timezone: ${safe.timezone}`,
    `User Agent: ${safe.userAgent}`
  ].join('\n');

  const htmlBody = `
    <div style="background: #f7f5f1; padding: 24px; font-family: Arial, Helvetica, sans-serif; color: #111827;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 760px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb;">
        <tr>
          <td style="padding: 24px 28px; border-bottom: 1px solid #e5e7eb; background: #faf7f2;">
            <p style="margin: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: #8b5e3c;">Art Aesthete</p>
            <h2 style="margin: 8px 0 0; font-size: 24px; font-weight: 600; color: #1f2937;">New Booking Enquiry</h2>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px 28px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
              ${renderHtmlDetailRow('Name', safe.name)}
              ${renderHtmlDetailRow('Email', `<a href="mailto:${safe.email}" style="color:#8b5e3c; text-decoration:none;">${safe.email}</a>`)}
              ${renderHtmlDetailRow('Location', safe.location)}
              ${renderHtmlDetailRow('Budget', safe.budget)}
              ${renderHtmlDetailRow('How They Found You', safe.source)}
            </table>

            <div style="margin-top: 22px;">
              <h3 style="margin: 0 0 8px; font-size: 16px; color: #1f2937;">Project Types</h3>
              <ul style="margin: 0; padding-left: 20px; color: #374151;">${toHtmlList(payload.projectTypes)}</ul>
            </div>

            <div style="margin-top: 18px;">
              <h3 style="margin: 0 0 8px; font-size: 16px; color: #1f2937;">Spaces</h3>
              <ul style="margin: 0; padding-left: 20px; color: #374151;">${toHtmlList(payload.spaces)}</ul>
            </div>

            <div style="margin-top: 18px;">
              <h3 style="margin: 0 0 8px; font-size: 16px; color: #1f2937;">Aesthetics</h3>
              <ul style="margin: 0; padding-left: 20px; color: #374151;">${toHtmlList(payload.aesthetics)}</ul>
            </div>

            <div style="margin-top: 20px;">
              <h3 style="margin: 0 0 8px; font-size: 16px; color: #1f2937;">Client Notes</h3>
              <p style="margin: 0; color: #374151; line-height: 1.6;">${safe.details.replaceAll('\n', '<br/>')}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 18px 28px 24px; border-top: 1px solid #e5e7eb; background: #fcfcfc;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #6b7280;">Submitted At: ${safe.submittedAt}</p>
            <p style="margin: 0 0 8px; font-size: 13px; color: #6b7280;">Page Path: ${safe.pagePath}</p>
            <p style="margin: 0 0 8px; font-size: 13px; color: #6b7280;">Page URL: ${safe.pageUrl}</p>
            <p style="margin: 0 0 8px; font-size: 13px; color: #6b7280;">Timezone: ${safe.timezone}</p>
            <p style="margin: 0; font-size: 13px; color: #6b7280;">User Agent: ${safe.userAgent}</p>
          </td>
        </tr>
      </table>
    </div>
  `;

  return { subject, textBody, htmlBody };
};

const sendBookingEmail = async (payload) => {
  const { subject, textBody, htmlBody } = buildEmailContent(payload);

  const command = new SendEmailCommand({
    FromEmailAddress: process.env.SES_FROM_EMAIL,
    Destination: {
      ToAddresses: [process.env.SES_TO_EMAIL || '']
    },
    ReplyToAddresses: [payload.email],
    Content: {
      Simple: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8'
        },
        Body: {
          Text: {
            Data: textBody,
            Charset: 'UTF-8'
          },
          Html: {
            Data: htmlBody,
            Charset: 'UTF-8'
          }
        }
      }
    }
  });

  await ses.send(command);
};

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: corsHeaders,
  body: JSON.stringify(body)
});

const getHttpMethod = (event) => {
  if (event?.requestContext?.http?.method) {
    return event.requestContext.http.method;
  }

  if (event?.httpMethod) {
    return event.httpMethod;
  }

  return '';
};

const isOptionsRequest = (event) => getHttpMethod(event).toUpperCase() === 'OPTIONS';

export const handler = async (event) => {
  if (isOptionsRequest(event)) {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    checkRequiredEnv();

    const rawBody = typeof event?.body === 'string' ? event.body : '';
    let payload = {};

    try {
      payload = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      return jsonResponse(400, {
        message: 'Invalid JSON body.'
      });
    }

    const { isValid, errors, normalized } = validatePayload(payload);

    if (!isValid) {
      return jsonResponse(400, {
        message: 'Validation failed',
        errors
      });
    }

    await sendBookingEmail(normalized);

    return jsonResponse(200, {
      message: 'Booking enquiry sent successfully.'
    });
  } catch (error) {
    console.error('Booking submit error:', error);

    return jsonResponse(500, {
      message: 'Internal server error while sending booking enquiry.'
    });
  }
};
