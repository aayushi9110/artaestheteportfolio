# Art Aesthete Portfolio

A modern React TypeScript portfolio website for an interior design studio.

## Features

- Built with React 18 and TypeScript
- Modern UI with custom animations
- Responsive design
- Google Analytics integration
- Optimized for deployment to AWS S3 and CloudFront

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Deployment to AWS S3 and CloudFront

### Prerequisites
- AWS CLI installed and configured
- S3 bucket created
- CloudFront distribution set up

### Steps

1. Build the project:
   ```bash
   npm run build
   ```

2. Sync to S3 bucket:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. Invalidate CloudFront cache:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

### Cost-Effective Configuration

- Use S3 Standard storage class for static files
- Enable CloudFront caching for better performance
- Leverage AWS Free Tier (5GB S3, 1TB CloudFront transfer/month)

## Analytics

Google Analytics is integrated. Replace `GA_MEASUREMENT_ID` in `index.html` with your actual GA4 measurement ID.

## Technologies Used

- React 18
- TypeScript
- Vite (build tool)
- React Router (navigation)
- CSS custom properties
- Google Analytics (free tier)