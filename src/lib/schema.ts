export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  inLanguage?: string;
  about?: string[];
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  const imageUrl = article.image.startsWith('http')
    ? article.image
    : `https://www.weddingplanningchecklists.org${article.image.startsWith('/') ? '' : '/'}${article.image}`;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${article.url}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    },
    headline: article.title,
    description: article.description,
    image: imageUrl,
    inLanguage: article.inLanguage || 'en',
    ...(article.about ? { about: article.about } : {}),
    author: {
      '@type': 'Organization',
      name: article.authorName || 'Wedding Planning Checklists Team',
      url: 'https://www.weddingplanningchecklists.org/about-us'
    },
    publisher: {
      '@type': 'Organization',
      name: 'WeddingPlanningChecklists.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.weddingplanningchecklists.org/favicon.png'
      }
    },
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    ...(article.dateModified ? { dateModified: article.dateModified } : {})
  });
}

export function generateFAQSchema(faqs: { q: string; a: string }[], url?: string) {
  if (!faqs || faqs.length === 0) return null;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(url ? { '@id': `${url}#faq` } : {}),
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

export function generateItemListSchema(list: { name: string; items: string[] }, url: string) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#tips`,
    name: list.name,
    numberOfItems: list.items.length,
    itemListElement: list.items.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name
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
