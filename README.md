# Art Aesthete Portfolio

A modern React TypeScript portfolio website for an interior design studio.

## Features

- Built with React  18 and TypeScript
- Modern UI with custom animations
- Responsive design
- Google Analytics integration
- Optimized for deployment to AWS S3 and CloudFront

## Setup

1. Install dependencies:
   ```bash
   cd react-portfolio
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

## Generate Portfolio PDF (Top 10 Case Studies)

This project includes a custom generator that creates a dedicated PDF portfolio layout (cover page + top 10 case studies + 4 images per case study).

## Centralized Content (Single Source of Truth)

Website and PDF copy has been centralized so you can edit text in one place.

### Edit this file

- `react-portfolio/src/data/contentData.ts`

### What is controlled from `contentData.ts`

- Brand values:
   - Site URL shown in PDF footer
   - Logo alt text
- Home content:
   - Punchline
   - Hero title lines
   - Hero description
   - Stats values and labels
- About content:
   - Kicker
   - Heading
   - Lead text
   - Story paragraphs (used in website + PDF)
- PDF content:
   - Toolbar hint text
   - Output file name
   - Case study label prefix (for example: `Project`)
   - Image captions (`featured`, `before`, `after`)

### Where this shared content is used

- Website Home page: `react-portfolio/src/pages/Home/Home.tsx`
- Website About page: `react-portfolio/src/pages/About/About.tsx`
- PDF preview page: `react-portfolio/src/pages/PortfolioPdfPreview/PortfolioPdfPreview.tsx`
- PDF HTML generator: `react-portfolio/scripts/generatePortfolioPdf.mts`

### Files involved

- `react-portfolio/scripts/generatePortfolioPdf.mts`
- Output HTML: `react-portfolio/dist/portfolio-top10-source.html`
- Output PDF: `react-portfolio/dist/Art-Aesthete-Portfolio-Top10.pdf`

### Quick run (macOS with Google Chrome installed)

From `react-portfolio/`:

```bash
npm run build
npm run generate:portfolio-pdf
```

### Manual run (step-by-step)

1. Build the website assets:

```bash
npm run build
```

2. Generate the custom portfolio HTML source:

```bash
npm run generate:portfolio-html
```

3. Serve the `dist` folder:

```bash
npm run preview -- --host 127.0.0.1 --port 4173
```

4. In a second terminal, export the PDF using headless Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
   --headless=new \
   --disable-gpu \
   --virtual-time-budget=30000 \
   --print-to-pdf="$PWD/dist/Art-Aesthete-Portfolio-Top10.pdf" \
   "http://127.0.0.1:4173/portfolio-top10-source.html"
```

Note: The one-command script `generate:portfolio-pdf` is currently macOS-specific because it uses the default Google Chrome app path.

## Live PDF Preview in Dev (with Generate button)

You can now preview the portfolio PDF layout inside the app and generate/download directly from the browser.

### Start the preview endpoint

From `react-portfolio/` run:

```bash
npm run dev:pdf
```

This opens:

- `http://localhost:5173/portfolio-pdf-preview`

### How to use

1. Open the preview page endpoint above.
2. Review all pages (cover + top 10 case studies).
3. Click **Generate PDF** at the top right.
4. Your browser downloads: `Art-Aesthete-Portfolio-Top10.pdf`.

This method helps you validate the final look before using the CLI export script.

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

## To-Do

- Add image files to `public/images/` with the following filenames:
  - hero-image-1.jpg
  - hero-image-2.jpg
  - hero-image-3.jpg
  - studio.jpg
  - project-1.jpg to project-7.jpg
  - testimonial-1.jpg to testimonial-3.jpg
  - studio-about.jpg
- Replace placeholder images with actual portfolio images
- Update Google Analytics measurement ID in `index.html`
- Deploy to production (AWS S3 + CloudFront as described above)
- Test all links and functionality
- Separate components into the folders with respective CSS