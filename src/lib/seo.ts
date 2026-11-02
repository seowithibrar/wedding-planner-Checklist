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
  // Add the site name only when the result still fits Google's ~65-character title width
  const suffix = ' | Wedding Planning Checklists';
  const fullTitle = titleIsFinal || title.toLowerCase().includes('wedding planning checklists') || title.toLowerCase().includes('wedding planning checklist') || (title + suffix).length > 65
    ? title 
    : `${title}${suffix}`;
  
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
