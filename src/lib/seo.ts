export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  titleIsFinal?: boolean;
}

export function getSEOMetadata({ title, description, canonical, image, type = 'website', titleIsFinal = false }: SEOProps) {
  const siteUrl = 'https://www.weddingplanningchecklists.org';
  const fullTitle = titleIsFinal || title.toLowerCase().includes('wedding planning checklists') || title.toLowerCase().includes('wedding planning checklist')
    ? title 
    : `${title} | Wedding Planning Checklists`;
  
  const canonicalUrl = canonical || siteUrl;
  const ogImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.jpg`;

  return {
    title: fullTitle,
    description,
    canonicalUrl,
    ogImage,
    type
  };
}
