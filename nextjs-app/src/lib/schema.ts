export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    },
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
      '@type': 'Organization',
      name: article.authorName || 'Wedding Planning Checklists Team',
      url: 'https://www.weddingplanningchecklists.org'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wedding Planning Checklists',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.weddingplanningchecklists.org/favicon.png'
      }
    },
    datePublished: article.datePublished || '2026-01-01',
    dateModified: article.dateModified || '2026-08-01'
  });
}

export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  });
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.item
    }))
  });
}

export function generateWebApplicationSchema(app: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: { price: string; priceCurrency: string };
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: app.name,
    description: app.description,
    url: app.url,
    applicationCategory: app.applicationCategory || 'LifestyleApplication',
    operatingSystem: app.operatingSystem || 'All',
    offers: app.offers || {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    provider: {
      '@type': 'Organization',
      name: 'Wedding Planning Checklists',
      url: 'https://www.weddingplanningchecklists.org'
    }
  });
}

export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  url?: string;
  steps: { name: string; text: string }[];
}) {
  if (!howTo || !howTo.steps || howTo.steps.length === 0) return null;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    ...(howTo.url ? { '@id': `${howTo.url}#howto` } : {}),
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map(s => ({
      '@type': 'HowToStep',
      name: s.name,
      text: s.text
    }))
  });
}
