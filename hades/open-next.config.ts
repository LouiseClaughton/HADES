// open-next.config.ts
const config = {
  output: '.open-next',

  // Optional: your API routes if you had Netlify functions
  functionsDir: 'netlify/functions',

  // Optional: preview secret if you use Contentful preview mode
  previewMode: { secret: process.env.CONTENTFUL_PREVIEW_TOKEN },
}

export default config