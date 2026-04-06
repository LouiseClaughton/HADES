// open-next.config.cjs
module.exports = {
  output: '.open-next',
  functionsDir: 'netlify/functions',
  previewMode: { secret: process.env.CONTENTFUL_PREVIEW_TOKEN },
};