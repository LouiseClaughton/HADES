// open-next.config.ts
module.exports = {
  // Required: output folder for OpenNext
  output: '.open-next',

  // Optional: API routes / serverless functions folder
  functionsDir: 'netlify/functions',

  // Optional: preview mode secret for Contentful drafts
  previewMode: {
    secret: process.env.CONTENTFUL_PREVIEW_TOKEN
  }
};