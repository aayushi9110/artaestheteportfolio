# Booking Mailer Operations Runbook

This runbook documents how to operate the booking mailer after initial setup.

## Current Architecture
- Frontend booking form sends POST request from react-portfolio/src/pages/Book/Book.tsx.
- **API Gateway** route forwards request to **AWS Lambda**.
- **AWS Lambda** handler in lambda/booking-submit/index.mjs validates payload and sends email through **Amazon SES**.

## Critical Reminder
- Keep all related services in the same **AWS Region**.
- Current production region in this setup: **us-east-1**.

## Where To Change What

### Change frontend API endpoint
- File: react-portfolio/.env (or .env.local)
- Variable: VITE_BOOKING_API_URL
- Value format:
  - REST API with stage and route: https://<api-id>.execute-api.<region>.amazonaws.com/prod/book
  - HTTP API default stage: https://<api-id>.execute-api.<region>.amazonaws.com/book

### Change optional frontend API key
- File: react-portfolio/.env (or .env.local)
- Variable: VITE_BOOKING_API_KEY

### Change request timeout
- File: react-portfolio/.env (or .env.local)
- Variable: VITE_BOOKING_REQUEST_TIMEOUT_MS
- Default: 15000

### Change sender and recipient email
- AWS Console -> **AWS Lambda** -> booking-submit -> Configuration -> Environment variables
- Update:
  - SES_FROM_EMAIL
  - SES_TO_EMAIL
- In **Amazon SES** sandbox mode, both addresses must be verified in the same **AWS Region**.

### Change allowed frontend origin (CORS)
- AWS Console -> **AWS Lambda** -> booking-submit -> Configuration -> Environment variables
- Update CORS_ALLOW_ORIGIN to exact origin, for example:
  - http://localhost:5173
  - https://yourdomain.com
- No trailing slash and no path.

### Add a new allowed domain/origin
Current code supports one origin value through CORS_ALLOW_ORIGIN.
- Quick method: replace CORS_ALLOW_ORIGIN with new origin.
- Safer release method:
  1. Test origin in local or staging.
  2. Update CORS_ALLOW_ORIGIN.
  3. Test browser preflight and POST.

If you need multiple origins at once, update lambda/booking-submit/index.mjs to read an allowlist env variable and echo back matching Origin.

## Configuration Management Strategy

### Recommended env split
- Local dev frontend: react-portfolio/.env.local
- Shared template only: react-portfolio/.env.example
- Lambda runtime config: **AWS Lambda** Environment variables

### Minimal config checklist before release
- **AWS Lambda Region** matches **Amazon SES Region**.
- SES_FROM_EMAIL is verified.
- SES_TO_EMAIL is verified (sandbox).
- **AWS Lambda IAM role** includes ses:SendEmail and ses:SendRawEmail.
- API route exists: POST /book.
- CORS_ALLOW_ORIGIN matches actual frontend origin.
- Frontend VITE_BOOKING_API_URL points to full route URL.

## Basic Troubleshooting

### Error: 500 with message Internal server error while sending booking enquiry
- Check **Amazon CloudWatch Logs** for line starting with: Booking submit error:
- Common root causes:
  - Missing env vars
  - **Amazon SES** identity not verified
  - **IAM** AccessDenied for **Amazon SES**
  - **AWS Region** mismatch

### Error: MessageRejected Email address is not verified
- Verify email identity in **Amazon SES** as Email address type.
- Do not use Domain type for Gmail addresses.
- Verify in same **AWS Region** as **AWS Lambda** (for example **us-east-1**).

### Error: CORS blocked in browser
- Confirm CORS_ALLOW_ORIGIN equals exact browser origin.
- Confirm **API Gateway** CORS allows:
  - Methods: OPTIONS, POST
  - Headers: Content-Type, x-api-key
- If **API Gateway HTTP API** stage uses auto-deploy, changes are usually live without manual deploy.

### Error: 400 Validation failed
- Payload must include:
  - name (2+ chars)
  - valid email
  - location (2+ chars)
  - at least one selection for projectTypes, spaces, aesthetics

### Error: Timeout
- Increase VITE_BOOKING_REQUEST_TIMEOUT_MS in frontend env.
- Check **AWS Lambda** duration and **Amazon SES** response latency.

## CloudWatch Quick Path
- **AWS Lambda** -> booking-submit -> Monitor -> View **CloudWatch logs** -> latest stream
- Search terms:
  - Booking submit error
  - MessageRejected
  - AccessDenied
  - Missing required env vars

## Change Log Template
When you change mailer config, add a short note:
- Date:
- Changed by:
- What changed:
- Why:
- Verified by test request: Yes/No
- CloudWatch log stream checked: Yes/No

## TODO: Migrate To Environment As Code
- [ ] Move booking mailer infrastructure from manual console setup to Infrastructure as Code.
- [ ] Include these resources in one deployable stack:
  - **AWS Lambda** function
  - **API Gateway** route (POST /book)
  - **IAM** role and policy for **Amazon SES** send permissions
  - **CloudWatch Logs** retention policy
  - **AWS Lambda** environment variables
- [ ] Store per-environment values in separate variable files (dev, staging, prod).
- [ ] Add one command for create or update and one command for destroy.

### Good Example: Terraform Starter Pattern
Use this structure:

```text
infra/
  main.tf
  variables.tf
  outputs.tf
  terraform.tfvars.dev
  terraform.tfvars.prod
```

Example `infra/main.tf`:

```hcl
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_iam_role" "booking_lambda_role" {
  name = "booking-submit-lambda-role-${var.env}"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = { Service = "lambda.amazonaws.com" },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.booking_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "ses_send_policy" {
  name = "booking-ses-send-${var.env}"
  role = aws_iam_role.booking_lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Action = ["ses:SendEmail", "ses:SendRawEmail"],
      Resource = "*"
    }]
  })
}

resource "aws_lambda_function" "booking_submit" {
  function_name = "booking-submit-${var.env}"
  role          = aws_iam_role.booking_lambda_role.arn
  runtime       = "nodejs20.x"
  handler       = "index.handler"
  filename      = var.lambda_zip_path

  environment {
    variables = {
      SES_FROM_EMAIL    = var.ses_from_email
      SES_TO_EMAIL      = var.ses_to_email
      CORS_ALLOW_ORIGIN = var.cors_allow_origin
    }
  }
}

resource "aws_apigatewayv2_api" "booking_api" {
  name          = "booking-submit-api-${var.env}"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = [var.cors_allow_origin]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type", "x-api-key"]
  }
}

resource "aws_apigatewayv2_integration" "booking_integration" {
  api_id                 = aws_apigatewayv2_api.booking_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.booking_submit.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "booking_route" {
  api_id    = aws_apigatewayv2_api.booking_api.id
  route_key = "POST /book"
  target    = "integrations/${aws_apigatewayv2_integration.booking_integration.id}"
}

resource "aws_apigatewayv2_stage" "booking_stage" {
  api_id      = aws_apigatewayv2_api.booking_api.id
  name        = var.api_stage
  auto_deploy = true
}

resource "aws_lambda_permission" "allow_apigw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.booking_submit.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.booking_api.execution_arn}/*/*"
}
```

Example `infra/variables.tf`:

```hcl
variable "env" { type = string }
variable "aws_region" { type = string }
variable "api_stage" { type = string }
variable "lambda_zip_path" { type = string }
variable "ses_from_email" { type = string }
variable "ses_to_email" { type = string }
variable "cors_allow_origin" { type = string }
```

Example `infra/outputs.tf`:

```hcl
output "booking_api_url" {
  value = "${aws_apigatewayv2_stage.booking_stage.invoke_url}/book"
}
```

Example `infra/terraform.tfvars.dev`:

```hcl
env               = "dev"
aws_region        = "us-east-1"
api_stage         = "prod"
lambda_zip_path   = "../lambda/booking-submit/function.zip"
ses_from_email    = "verified-sender@example.com"
ses_to_email      = "verified-recipient@example.com"
cors_allow_origin = "http://localhost:5173"
```

Deploy and destroy commands:

```bash
cd infra
terraform init
terraform apply -var-file="terraform.tfvars.dev"
terraform output booking_api_url
terraform destroy -var-file="terraform.tfvars.dev"
```

Notes:
- Keep **AWS Region** the same across **AWS Lambda**, **Amazon SES**, and **API Gateway**.
- In **Amazon SES** sandbox, sender and recipient identities must be verified.
- Update frontend VITE_BOOKING_API_URL with the `booking_api_url` output.
