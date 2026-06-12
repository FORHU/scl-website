import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Gemini', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      { userAgent: 'FacebookBot', allow: '/' },
    ],
    sitemap: 'https://forhu.ai/sitemap.xml',
  }
}
