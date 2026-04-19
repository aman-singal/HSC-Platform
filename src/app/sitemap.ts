import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hindustanscrap.com'
  
  // Define static routes
  const routes = [
    '',
    '/about',
    '/services',
    '/price',
    '/contact',
    '/compliance',
    '/faq',
    '/blog',
    '/process',
    '/documents',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
